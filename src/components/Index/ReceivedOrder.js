import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination, Message} from 'element-react';
import {connect} from "react-redux";
import * as foodAction from "../../action/foodAction";
import Connect from "../../service/address";
import axios from "axios";


class ReceivedOrder extends Component {

    constructor(props) {

        super(props);
        this.state = {
            columns: [
                {
                    label: "序号",
                    width: 60,
                    render: (row, column, index) => {
                        const {pageNo, pageSize} = this.state
                        return <span>{(pageNo - 1) * pageSize + index + 1}</span>
                    }
                },
                {
                    label: "下单顾客",
                    prop: "name",
                    width: 120,
                    render: function (data) {
                        return <span>{data.name}</span>
                    }
                },
                {
                    label: "订单价格",
                    prop: "price",
                    width: 120,
                    render: function (data) {
                        return <span>￥{data.price}</span>
                    }
                },
                {
                    label: "下单时间",
                    prop: "timeOrder",
                    width: 200,
                    render: function (data) {
                        return <span>{data.time}</span>
                    }
                },
                {
                    label: "预计送达时间",
                    prop: "timeDelivery",
                    width: 200,
                    render: function (data) {
                        return <span>{data.time}</span>
                    }
                },
                {
                    label: "订单信息",
                    prop: "orderMessage",
                    width: 300,
                    render: function (data) {
                        return <span>{data.time}</span>
                    }
                },
                {
                    label: "配送地址",
                    prop: "address",
                    width: 300,
                    render: function (data) {
                        return <span>{data.description}</span>
                    }
                },
                {
                    label: "是否送达",
                    render: (data) => {
                        return (
                            <span>
             <Button type="primary" onClick={() => this.completeOrder(data)}>是</Button>
            </span>
                        )
                    }
                }
            ],
            data: [

            ],
            total: null,
            pageSize: 8,
            pageNo: 1
        }
    }

    componentDidMount() {
        //加载数据
        // this.loadingData()
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps && nextProps.foodData && nextProps.foodData.code === 2000) {
    //         let foodData = nextProps.foodData
    //         this.setState({
    //             data: foodData.data,
    //             total: foodData.total
    //         })
    //     }
    // }

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


    //是否送达
    completeOrder = (data) => {

    }

    // //删除菜单
    // deleteFood = (data) => {
    //     let id = data._id
    //     axios.post(Connect.deleteFood, {
    //         id
    //     }).then(res => {
    //         if (res.data.code === 2000) {
    //             Message({
    //                 showClose: true,
    //                 message: res.data.message,
    //                 type: 'success'
    //             });
    //             this.loadingData()
    //         }
    //         if (res.data.code === 2001) {
    //             Message({
    //                 showClose: true,
    //                 message: res.data.message,
    //                 type: 'error'
    //             });
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }


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
)(ReceivedOrder)