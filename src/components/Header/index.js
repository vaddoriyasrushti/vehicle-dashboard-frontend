import { Button, Input, Layout } from "antd";
import React, { useState } from "react";
import "./header.scss";
import AddVehicleModal from "../AddEditVehicleModal";

const { Search } = Input;
const { Header } = Layout;

const AntHeader = ({setSearchText, searchText}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleAddVehicleModel = () => {
    setIsAddModalOpen((modalStatus) => !modalStatus);
  };

  const onSearch = (e) => {setSearchText(e.target.value)}

  return (
    <div>
      <Header className="antd-navbar">
        <div className="header-button">
          <Button onClick={toggleAddVehicleModel}>Add New Vehicle</Button>
          <Search
            placeholder="input search text"
            onChange={(e) => onSearch(e)}
            style={{
              width: 200,
            }} 
          />
        </div>
      </Header>

      <AddVehicleModal 
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        toggleAddVehicleModel={toggleAddVehicleModel}
      />
    </div>
  );
};

export default AntHeader;
