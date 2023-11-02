import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import "./dashboard.scss";
import { Space, Table, Modal } from "antd";
import { Column } from '@ant-design/plots';
import { deleteVehicleByNo, getVehicleList } from "../../reducer/vehicle";
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import EditVehicleModal from "../AddEditVehicleModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [vehicleData, setVehicleData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({})
  const [searchText, setSearchText] = useOutletContext();
  const {vehicleList} = useSelector(state => state.vehicle);
  
  useEffect(() => {
    dispatch(getVehicleList())
  }, [])

  
  useEffect(() => {
    const searchVal = searchText.toLowerCase();
    let searchData = [...vehicleList];
    if(searchVal){
      searchData = vehicleList.filter(item => {
        return (
          item.no.toString().toLowerCase().includes(searchVal) || 
          item.make.toLowerCase().includes(searchVal) || 
          item.model.toLowerCase().includes(searchVal) || 
          item.year.toString().toLowerCase().includes(searchVal)
        ) 
      })
    }
    setVehicleData(searchData)
    
  }, [searchText])

  useEffect(() => {
    setVehicleData(vehicleList || [])
    const liveCount = vehicleList?.filter((data) => { return data.status === 'Live' }).length;
    const soldCount = vehicleList?.filter((data) => { return data.status === 'Sold' }).length;
    setChartData([
      {label: 'Live', count: liveCount},
      {label: 'Sold', count: soldCount}
    ])
  }, [vehicleList])

  const toggleAddVehicleModel = () => {
    setIsAddModalOpen((modalStatus) => !modalStatus);
  };
  const toggleDeleteVehicleModel = () => {
    setIsDeleteModalOpen((modalStatus) => !modalStatus);
  };

  const handleEditClick = (record) => {
    setSelectedVehicle(record)
    toggleAddVehicleModel()
  }

  const handleDelete = (record) => {
    setSelectedVehicle(record)
    toggleDeleteVehicleModel();
  }

  const confirmDelete = () => {
    const onSuccess = (res) => {
      if (res.status === 200) {
        console.log(res);
        setIsDeleteModalOpen(false);
      } else {
        setIsDeleteModalOpen(true);
      }
    };
    const onFailure = (res) => {
      console.log(res);
    };
    dispatch(deleteVehicleByNo(selectedVehicle.no, onSuccess, onFailure))

  }

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (price) => (
        <div>
          ${price}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <p className="edit-icon" onClick={() => handleEditClick(record)}><EditOutlined /></p>
          <p className="delete-icon" onClick={() => handleDelete(record)}><DeleteFilled /></p>
        </Space>
      ),
    },
  ];

  const config = {
    width: 200,
    height: 200,
    autoFit: false,
    xField: 'label',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    
  };

  return (
    <div className="dashboard">
      <div className="chart"><Column {...config} data={chartData}/></div>
      <div className="vehicle-table">
        <Table rowKey={record => record.no} columns={columns} dataSource={vehicleData} pagination={false} />
        <EditVehicleModal 
          isEdit={true}
          selectedVehicle={selectedVehicle}
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          toggleAddVehicleModel={toggleAddVehicleModel}
        />
        <Modal
          title="Delete Confirmation Modal"
          open={isDeleteModalOpen}
          onOk={confirmDelete}
          onCancel={toggleDeleteVehicleModel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you surr you want to delete this record ?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
