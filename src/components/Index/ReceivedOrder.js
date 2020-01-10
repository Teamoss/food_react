import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination, Message, TimeSelect} from 'element-react';
import {connect} from "react-redux";
import * as orderAction from "../../action/orderAction";
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
                    label: "送达时间",
                    prop: "sendTime",
                    width: 220,
                    render: (data) => {
                        return (
                            <TimeSelect
                                start={data.sendTime}
                                step="00:10"
                                end="23:59"
                                onChange={(time) => this.handleUpdate(time, data._id)}
                                value={data.finishTime}
                                placeholder="选择时间"
                            />
                        )
                    }
                },
                {
                    label: "订单信息",
                    prop: "food",
                    width: 400,
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
                    width: 240,
                    render: function (data) {
                        return <span>{data.address}</span>
                    }
                },
                {
                    label: "是否送达",
                    width: 100,
                    render: (data) => {
                        return (
                            <span>
             <Button type="primary" onClick={() => this.finishOrder(data)}>是</Button>
            </span>
                        )
                    }
                }
            ],
            data: [],
            total: null,
            pageSize: 8,
            pageNo: 1,
            timeValue: null,
        }
    }

    componentDidMount() {
        //加载数据
        this.loadingData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderData && nextProps.orderData.code === 2000) {
            let orderData = nextProps.orderData
            orderData.data.forEach(item => {
                item['finishTime'] = null
            })
            this.setState({
                data: orderData.data,
                total: orderData.total
            })
        }
    }


    handleUpdate = (time, id) => {
        const {data} = this.state

        let arr = time.toString().split(/\s+/)
        let _time = arr[4]
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let sendTime = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${_time}`
        let detailTime = _time.toString().split(':')
        let house = detailTime[0]
        let minute = detailTime[1]
        data.forEach((item, index) => {
            if (item._id == id) {
                item['finishTime'] = new Date(year, month, date, house, minute)
                item['formFinishTime'] = sendTime
            }
        })

    }

    loadingData = () => {
        const {findAllBusinessOrder} = this.props
        const {pageSize, pageNo} = this.state
        let data = JSON.parse(sessionStorage.getItem('userInfo'));
        let business = data._id
        findAllBusinessOrder({
            type: 1,
            business,
            pageSize,
            pageNo
        })
    }


    //送达订单
    finishOrder = (data) => {

        const {formFinishTime, _id} = data
        if (formFinishTime) {
            axios.post(Connect.changeOrder, {
                id: _id,
                type: 2,
                finishTime: formFinishTime
            }).then(res => {
                if (res.data.code === 2000) {
                    Message({
                        showClose: true,
                        message: '订单完成',
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
                message: '请选择送达时间',
                type: 'error'
            });
        }
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
            type: 1,
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
    }),
    (dispatch) => ({
        findAllBusinessOrder: (params) => dispatch(orderAction.findAllBusinessOrder(params)),
    })
)(ReceivedOrder)