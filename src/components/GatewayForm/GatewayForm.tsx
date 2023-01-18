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

type Props = {};

const schema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  ipAddress: z.string().refine(isIP, {
    message: 'Please enter a valid IP',
  }),
});

type FormType = z.infer<typeof schema>;

const GatewayForm = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    ...gatewayService.createGateway(),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit: SubmitHandler<FormType> = (formData) => {
    console.log(
      '🚀 ~ file: GatewayForm.tsx:49 ~ GatewayForm ~ formData',
      formData,
    );
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
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                aria-describedby="name-help"
                type="text"
                id="name"
                {...register('name')}
              />
              {formState.errors.name?.message ? (
                <Form.Text id="name-help" className="text-danger">
                  {formState.errors.name.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="ipAddress">Ip Address</Form.Label>
              <Form.Control
                aria-describedby="ipAddress-help"
                type="ipAddress"
                id="ipAddress"
                {...register('ipAddress')}
              />
              {formState.errors.ipAddress?.message ? (
                <Form.Text id="ipAddress-help" className="text-danger">
                  {formState.errors.ipAddress.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Button type="submit" className="mt-5">
              Add
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default GatewayForm;
