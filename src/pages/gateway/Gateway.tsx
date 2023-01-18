import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Button, Container, Stack, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import DeviceForm from '../../components/DeviceForm';
import Modal from '../../components/Modal';
import Nav from '../../components/Nav';
import { deviceService, gatewayService } from '../../service';

const Gateway = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const { data: gatewayData } = useQuery({
    ...gatewayService.getGatewayById(id),
    // when true will fetch data
    enabled: id != null,
  });

  const { data: deviceData } = useQuery({
    ...deviceService.getDeviceByGatewayId(id),
    // when true will fetch data
    enabled: id != null,
  });

  return (
    <div>
      <Nav />
      <Container className="mt-5">
        <Stack
          direction="horizontal"
          className="justify-content-between m-3 mr-0 align-items-center"
        >
          <h3>Gateway: {gatewayData?.data.Name}</h3>
          <Button onClick={handleShow}>Add New Device</Button>
        </Stack>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>UID</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {deviceData?.data.map((datum) => (
              <tr key={datum._id}>
                <th>{datum.UID}</th>
                <th>{datum.Vendor}</th>
                <th>{datum.OnlineStatus === true ? 'Online' : 'Offline'}</th>
                <th>{datum.UID}</th>
                <th>{new Date(datum.createdAt).toLocaleDateString()}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {gatewayData != null ? (
        <Modal
          title="Add Device"
          show={showModal}
          onHide={handleClose}
          animation
          size="lg"
        >
          <DeviceForm gatewayId={gatewayData?.data._id} onClose={handleClose} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Gateway;
