import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Container, Table, Button, Stack } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import GatewayForm from '../../components/GatewayForm';
import Modal from '../../components/Modal';
import Nav from '../../components/Nav';
import { gatewayService } from '../../service';

type Props = {};

export const Index = (props: Props) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const history = useHistory();
  const { data } = useQuery({
    ...gatewayService.getGateway(),
    // when true will fetch data
    enabled: false,
  });

  const goToGatewayPage = (id: number) => {
    history.push(`/gateway/${id}`);
  };
  return (
    <div>
      <Nav />
      <Container className="mt-5">
        <Stack
          direction="horizontal"
          className="justify-content-between m-3 mr-0 align-items-center"
        >
          <h3>Gateway</h3>
          <Button onClick={handleShow}>Add New</Button>
        </Stack>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th> Name</th>
              <th>IPv4 Address</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => goToGatewayPage(1)}>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr onClick={() => goToGatewayPage(2)}>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr onClick={() => goToGatewayPage(3)}>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Modal
        title="Add Gateway"
        show={showModal}
        onHide={handleClose}
        animation
        size="lg"
      >
        <GatewayForm />
      </Modal>
    </div>
  );
};
