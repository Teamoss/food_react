import React, {Component} from 'react';
import 'element-theme-default';
import {Layout, Table, Button, Pagination} from 'element-react';
import {connect} from "react-redux";

class FoodMenu extends Component {

    constructor(props) {

        super(props);
        this.state = {
            columns: [
                {
                    type: 'index',
                    label: "序号",
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
                    prop: "image",
                    width: 250,
                    render: function (data) {
                        return <span><img height={55} src={data.image} alt="暂无图片"/></span>
                    }
                },
                {
                    label: "介绍",
                    prop: "describe",
                    width: 490,
                    render: function (data) {
                        return <span>{data.describe}</span>
                    }
                },
                {
                    label: "编辑",
                    render: () => {
                        return (
                            <span>
             <Button plain={true} type="info">编辑</Button>
            </span>
                        )
                    }
                },
                {
                    label: "删除",
                    render: () => {
                        return (
                            <span>
             <Button type="danger">删除</Button>
            </span>
                        )
                    }
                }
            ],
            data: [
                {
                    id: null,
                    name: '暂无名称',
                    price: '20.1',
                    image: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIAtibsicGaUUAGpGr8yo5G7MibcxgUPUreak1h1MAlp2quibB9qXxuruTdVnepiavDz8Tu9OIruLHMb7A/132',
                    describe: '无'
                },
                {
                    id: null,
                    name: '暂无名称',
                    price: '20.2',
                    image: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIAtibsicGaUUAGpGr8yo5G7MibcxgUPUreak1h1MAlp2quibB9qXxuruTdVnepiavDz8Tu9OIruLHMb7A/132',
                    describe: '无'
                },
               
            ]
        }
    }


    onCellClick = (row, column) => {
        let data = row
        let index = column.columnKey
        if (index == 'el-table_1_column_6') { //编辑
            console.log(data)
        }
        if (index == 'el-table_1_column_7') { //删除
            console.log(data)
        }
    }

    render() {
        return (
            <div>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    highlightCurrentRow={true}
                    onCellClick={this.onCellClick}
                />
                <div style={{
                    marginTop:10
                }}>
                    <div className="first">
                        <div className="block">
                            <Pagination layout="prev, pager, next" total={10} pageSize={8}/>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({

    })
)(FoodMenu)