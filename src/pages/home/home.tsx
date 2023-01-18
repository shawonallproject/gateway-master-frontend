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
  });

  const goToGatewayPage = (id: string) => {
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
        {data?.data != null ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th> Name</th>
                <th>IPv4 Address</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((datum) => (
                <tr
                  tabIndex={0}
                  onClick={() => goToGatewayPage(datum._id)}
                  key={datum._id}
                  role="button"
                >
                  <td>{datum.SerialNumber}</td>
                  <td>{datum.Name}</td>
                  <td>{datum.IPV4Address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Container>
      <Modal
        title="Add Gateway"
        show={showModal}
        onHide={handleClose}
        animation
        size="lg"
      >
        <GatewayForm onClose={handleClose} />
      </Modal>
    </div>
  );
};
