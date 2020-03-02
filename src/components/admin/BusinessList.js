import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination, Message} from 'element-react';
import {connect} from "react-redux";
import * as adminBusinessAction from "../../action/adminBusinessAction";
import Connect from "../../service/address";
import axios from "axios";


class BusinessList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            columns: [
                {
                    label: "序号",
                    width: 80,
                    render: (row, column, index) => {
                        const {pageNo, pageSize} = this.state
                        return <span>{(pageNo - 1) * pageSize + index + 1}</span>
                    }
                },
                {
                    label: "商家",
                    prop: "business",
                    width: 150,
                    render: function (data) {
                        return <span>{data.business}</span>
                    }
                },
                {
                    label: "图片",
                    prop: "logo",
                    width: 150,
                    render: function (data) {
                        return <span><img height={55} src={data.logo} alt="暂无图片"/></span>
                    }
                },
                {
                    label: "评分",
                    prop: "score",
                    width: 80,
                    render: function (data) {
                        return <span>{data.score}</span>
                    }
                },
                {
                    label: "销量",
                    prop: "saleNumber",
                    width: 100,
                    render: function (data) {
                        return <span>{data.saleNumber}</span>
                    }
                },
                {
                    label: "联系方式",
                    prop: " phone",
                    width: 150,
                    render: function (data) {
                        return <span>{data.phone}</span>
                    }
                },
                {
                    label: "地区",
                    prop: " address",
                    width: 300,
                    render: function (data) {
                        return <span>{data.address}</span>
                    }
                },
                {
                    label: "介绍",
                    prop: "content",
                    width: 300,
                    render: function (data) {
                        return <span>{data.content}</span>
                    }
                },
                {
                    label: "操作",
                    render: (data) => {
                        return (
                            <span>
             <Button type="danger" onClick={() => this.deleteBusiness(data)}>拉黑商家</Button>
            </span>
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
        if (nextProps && nextProps.businessData && nextProps.businessData.code === 2000) {
            let businessData = nextProps.businessData
            this.setState({
                data: businessData.data,
                total: businessData.total
            })
        }
    }

    loadingData = () => {
        const {adminBusiness,} = this.props
        const {pageSize, pageNo} = this.state
        adminBusiness({
            pageSize,
            pageNo
        })
    }


    //删除商家
    deleteBusiness = (data) => {
        let id = data._id
        axios.post(Connect.deleteBusiness, {
            id
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
    }


    //页数改变
    _onCurrentChange = (currentPage) => {
        const {adminBusiness} = this.props
        const {pageSize} = this.state
        this.setState({
            pageNo: currentPage
        })
        adminBusiness({
            pageSize,
            pageNo: currentPage
        })
    }

    //双击栏目编辑菜单
    // _onCellDbClick = (row) => {
    //     this.props.history.push({pathname: "/Index/EditFood", state: {data: row}});
    // }

    render() {
        const {total, pageSize} = this.state

        return (
            <div>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    height={540}
                    border={true}
                    highlightCurrentRow={true}
                    // onCellDbClick={(row) => this._onCellDbClick(row)}
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
        businessData: state.adminBusinessReducer.businessData,
        businessError: state.adminBusinessReducer.businessError,
    }),
    (dispatch) => ({
        adminBusiness: (params) => dispatch(adminBusinessAction.adminBusiness(params)),
    })
)(BusinessList)