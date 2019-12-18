import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination, Message} from 'element-react';
import {connect} from "react-redux";
import * as foodAction from "../../action/foodAction";
import Connect from "../../service/address";
import axios from "axios";


class FoodMenu extends Component {

    constructor(props) {

        super(props);
        this.state = {
            columns: [
                {
                    label: "序号",
                    width: 100,
                    render: (row, column, index) => {
                        const {pageNo, pageSize} = this.state
                        return <span>{(pageNo - 1) * pageSize + index + 1}</span>
                    }
                },
                {
                    label: "名称",
                    prop: "name",
                    width: 200,
                    render: function (data) {
                        return <span>{data.name}</span>
                    }
                },
                {
                    label: "价格",
                    prop: "price",
                    width: 200,
                    render: function (data) {
                        return <span>￥{data.price}</span>
                    }
                },
                {
                    label: "图片",
                    prop: "imageUrl",
                    width: 200,
                    render: function (data) {
                        return <span><img height={55} src={data.imageUrl} alt="暂无图片"/></span>
                    }
                },
                {
                    label: "介绍",
                    prop: "description",
                    width: 430,
                    render: function (data) {
                        return <span>{data.description}</span>
                    }
                },
                {
                    label: "编辑",
                    prop: "_id",
                    render: (data) => {
                        return (
                            <span>
             <Button type="primary" onClick={() => this.editFood(data)}>编辑</Button>
            </span>
                        )
                    }
                },
                {
                    label: "删除",
                    render: (data) => {
                        return (
                            <span>
             <Button type="danger" onClick={() => this.deleteFood(data)}>删除</Button>
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
        if (nextProps && nextProps.foodData && nextProps.foodData.code === 2000) {
            let foodData = nextProps.foodData
            this.setState({
                data: foodData.data,
                total: foodData.total
            })
        }
    }

    loadingData = () => {
        const {findAllFood,} = this.props
        const {pageSize, pageNo} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let business = data._id
        findAllFood({
            business,
            pageSize,
            pageNo
        })
    }

    //编辑菜单
    editFood = (data) => {
        this.props.history.push({pathname: "/Index/EditFood", state: {data}});
    }

    //删除菜单
    deleteFood = (data) => {
        let id = data._id
        axios.post(Connect.deleteFood, {
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
        const {findAllFood,} = this.props
        const {pageSize} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let business = data._id
        this.setState({
            pageNo: currentPage
        })
        findAllFood({
            business,
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
        foodData: state.foodReducer.foodData,
        foodError: state.foodReducer.foodError,
    }),
    (dispatch) => ({
        findAllFood: (params) => dispatch(foodAction.findAllFood(params)),
    })
)(FoodMenu)