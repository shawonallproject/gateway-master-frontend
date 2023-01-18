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
    ...gatewayService.getGatewayById(Number(id)),
    // when true will fetch data
    enabled: false && id != null,
  });

  const { data: deviceData } = useQuery({
    ...deviceService.getDevice(),
    // when true will fetch data
    enabled: false,
  });

  return (
    <div>
      <Nav />
      <Container className="mt-5">
        <Stack
          direction="horizontal"
          className="justify-content-between m-3 mr-0 align-items-center"
        >
          <h3>Gateway {id}</h3>
          <Button onClick={handleShow}>Add New Device</Button>
        </Stack>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th> Vendor</th>
              <th>Date Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Online</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>Online</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>Online</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Modal
        title="Add Device"
        show={showModal}
        onHide={handleClose}
        animation
        size="lg"
      >
        <DeviceForm />
      </Modal>
    </div>
  );
};

export default Gateway;
