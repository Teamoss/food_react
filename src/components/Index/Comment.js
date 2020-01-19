import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination, Message, MessageBox} from 'element-react';
import {connect} from "react-redux";
import * as commentAction from "../../action/commentAction";
import Connect from "../../service/address";
import axios from "axios";


class Comment extends Component {

    constructor(props) {

        super(props);
        this.state = {
            columns: [
                {
                    label: "序号",
                    width: 70,
                    render: (row, column, index) => {
                        const {pageNo, pageSize} = this.state
                        return <span>{(pageNo - 1) * pageSize + index + 1}</span>
                    }
                },
                {
                    label: "评论顾客",
                    prop: "userInfo",
                    width: 120,
                    render: function (data) {
                        return <span>{data.userInfo.nickName}</span>
                    }
                },
                {
                    label: "评论时间",
                    prop: "commentTime",
                    width: 200,
                    render: function (data) {
                        return <span>{data.commentTime}</span>
                    }
                },
                {
                    label: "评分",
                    prop: "score",
                    width: 80,
                    render: function (data) {
                        return <span style={{
                            color: 'red'
                        }}>{data.score}</span>
                    }
                },
                {
                    label: "评论内容",
                    prop: "comment",
                    width: 320,
                    render: function (data) {
                        return <span>{data.comment}</span>
                    }
                },
                {
                    label: "订单信息",
                    prop: "food",
                    width: 400,
                    render: (data) => {
                        return <div style={{}}>
                            {data && data.order && data.order.food.map((item, index) => {
                                return (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 5
                                    }} key={index}>
                                        <div style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 1,
                                            marginTop: 1,
                                        }}>
                                            <img style={{
                                                width: 40,
                                                height: 40
                                            }} src={item.imageUrl} alt='food'/>
                                        </div>
                                        <span style={{
                                            flex: 1,
                                            marginLeft: 10
                                        }}>{item.name}</span>
                                        <span style={{
                                            marginLeft: 20,
                                            color: 'red',
                                            flex: 2,
                                        }}>x{item.number}</span>
                                        <span style={{
                                            flex: 2,
                                            color: 'red',
                                        }}>￥{item.price}</span>
                                    </div>
                                )
                            })}
                        </div>
                    }
                },
                {
                    label: "商家回复",
                    width: 330,
                    prop: "businessComment",
                    render: (data) => {
                        return (
                            <div>
                                {data.businessComment ?
                                    <span>{data.businessComment}</span>
                                    :
                                    <Button type="info" onClick={() => this.comment(data)}>回复</Button>
                                }
                            </div>


                        )
                    }
                }
            ],
            data: [],
            total: null,
            pageSize: 8,
            pageNo: 1
        }
    }

    componentDidMount() {
        //加载数据
        this.loadingData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.commentData && nextProps.commentData.code === 2000) {
            let commentData = nextProps.commentData
            this.setState({
                data: commentData.data,
                total: commentData.total
            })
        }
    }

    //回复
    comment = (data) => {

        let id = data._id
        MessageBox.prompt('请输入回复内容').then(({value}) => {
            if (value) {
                axios.post(Connect.businessComment, {
                    id,
                    comment: value
                }).then(res => {
                    if (res.data.code === 2000) {
                        Message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.loadingData()
                    }
                    if (res.data.code === 2001) {
                        Message({
                            showClose: true,
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                Message({
                    showClose: true,
                    message: '请输入回复内容',
                    type: 'error'
                });
            }
        })


    }


    loadingData = () => {
        const {findAllComment} = this.props
        const {pageSize, pageNo} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let businessId = data._id
        findAllComment({
            businessId,
            pageSize,
            pageNo
        })
    }


    //页数改变
    _onCurrentChange = (currentPage) => {
        const {findAllComment,} = this.props
        const {pageSize} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let businessId = data._id
        this.setState({
            pageNo: currentPage
        })
        findAllComment({
            businessId,
            pageSize,
            pageNo: currentPage
        })
    }

    render() {

        const {total, pageSize, data, columns} = this.state

        return (
            <div>
                <Table
                    style={{width: '100%'}}
                    columns={columns}
                    data={data}
                    height={540}
                    border={true}
                    highlightCurrentRow={true}
                />
                <div style={{
                    marginTop: 10
                }}>
                    <div className="first">
                        <div className="block">
                            <Pagination layout="prev, pager, next"
                                        total={total}
                                        pageSize={pageSize}
                                        onCurrentChange={(currentPage) => this._onCurrentChange(currentPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        commentData: state.commentReducer.commentData,
        commentError: state.commentReducer.commentError,
    }),
    (dispatch) => ({
        findAllComment: (params) => dispatch(commentAction.findAllComment(params)),
    })
)(Comment)