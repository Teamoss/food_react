import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination, Message} from 'element-react';
import {connect} from "react-redux";
import * as orderAction from "../../action/orderAction";
import Connect from "../../service/address";
import axios from "axios";


class MissOrder extends Component {

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
                    label: "订单顾客",
                    prop: "name",
                    width: 100,
                    render: function (data) {
                        return <span>{data.name}</span>
                    }
                },
                {
                    label: "订单时间",
                    prop: "orderTime",
                    width: 180,
                    render: function (data) {
                        return <span>{data.orderTime}</span>
                    }
                },
                {
                    label: "期望送达时间",
                    prop: "sendTime",
                    width: 130,
                    render: function (data) {
                        return <span>{data.sendTime}</span>
                    }
                },
                {
                    label: "订单信息",
                    prop: "food",
                    width: 480,
                    render: (data) => {
                        return <div style={{}}>
                            {data.food.map((item, index) => {
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
                    label: "订单总额",
                    prop: "sumMoney",
                    width: 100,
                    render: function (data) {
                        return <span style={{
                            color: 'red'
                        }}>￥{data.sumMoney}</span>
                    }
                },
                {
                    label: "联系电话",
                    prop: "phone",
                    width: 130,
                    render: function (data) {
                        return <span>{data.phone}</span>
                    }
                },
                {
                    label: "配送地址",
                    prop: "address",
                    width: 230,
                    render: function (data) {
                        return <span>{data.address}</span>
                    }
                },
                {
                    label: "是否接单",
                    width: 100,
                    render: (data) => {
                        return (
                            <span>
             <Button type="primary" onClick={() => this.acceptOrder(data)}>是</Button>
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
        if (nextProps.orderData && nextProps.orderData.code === 2000) {
            let orderData = nextProps.orderData
            this.setState({
                data: orderData.data,
                total: orderData.total
            })
        }
    }

    //商家接单
    acceptOrder = (data) => {
        let id = data._id
        axios.post(Connect.changeOrder, {
            id,
            type: 1
        }).then(res => {
            if (res.data.code === 2000) {
                Message({
                    showClose: true,
                    message: '接单成功，请尽快配送',
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

    loadingData = () => {
        const {findAllBusinessOrder, loginData} = this.props
        const {pageSize, pageNo} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let business = data._id
        findAllBusinessOrder({
            type: 0,
            business,
            pageSize,
            pageNo
        })
    }


    //页数改变
    _onCurrentChange = (currentPage) => {
        const {findAllBusinessOrder,} = this.props
        const {pageSize} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let business = data._id
        this.setState({
            pageNo: currentPage
        })
        findAllBusinessOrder({
            type: 0,
            business,
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
        orderData: state.orderReducer.orderData,
        orderError: state.orderReducer.orderError,
        loginData: state.loginReducer.loginData,
        loginError: state.loginReducer.loginError,
    }),
    (dispatch) => ({
        findAllBusinessOrder: (params) => dispatch(orderAction.findAllBusinessOrder(params)),
    })
)(MissOrder)