import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { toast } from 'react-hot-toast';
import isIP from 'validator/lib/isIP';
import { z } from 'zod';

import { gatewayService } from '../../service';
import './GatewayForm.css';

type Props = {
  onClose: () => void;
};

const schema = z.object({
  SerialNumber: z.string().min(2, 'Must be at least 2 characters'),
  Name: z.string().min(2, 'Must be at least 2 characters'),
  IPV4Address: z.string().refine(isIP, {
    message: 'Please enter a valid IP',
  }),
});

type FormType = z.infer<typeof schema>;

const GatewayForm = ({ onClose }: Props) => {
  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    ...gatewayService.createGateway(),
    onSuccess: (data) => {
      // telling react query to refetch data
      queryClient.invalidateQueries();
      onClose();
    },
  });

  const onSubmit: SubmitHandler<FormType> = (formData) => {
    toast.promise(mutateAsync(formData), {
      loading: 'Creating Gateway',
      success: 'Successfully Created gateway',
      error: 'Error While creating gateway',
    });
  };
  return (
    <Container className="container-form pt-4" fluid>
      <Row>
        <Col>
          <Stack as="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="SerialNumber">Serial Number</Form.Label>
              <Form.Control
                aria-describedby="SerialNumber-help"
                type="text"
                id="SerialNumber"
                {...register('SerialNumber')}
              />
              {formState.errors.SerialNumber?.message ? (
                <Form.Text id="SerialNumber-help" className="text-danger">
                  {formState.errors.SerialNumber.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="Name">Name</Form.Label>
              <Form.Control
                aria-describedby="Name-help"
                type="text"
                id="Name"
                {...register('Name')}
              />
              {formState.errors.Name?.message ? (
                <Form.Text id="Name-help" className="text-danger">
                  {formState.errors.Name.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="IPV4Address">Ip Address</Form.Label>
              <Form.Control
                aria-describedby="IPV4Address-help"
                type="IPV4Address"
                id="IPV4Address"
                {...register('IPV4Address')}
              />
              {formState.errors.IPV4Address?.message ? (
                <Form.Text id="IPV4Address-help" className="text-danger">
                  {formState.errors.IPV4Address.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Button type="submit" className="mt-5" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default GatewayForm;
