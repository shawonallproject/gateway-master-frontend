import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { deviceService } from '../../service';
import './DeviceForm.css';

type Props = {};

const Status = ['online', 'offline'] as const;

const schema = z.object({
  vendor: z.string().min(2, 'Must be at least 2 characters'),
  dateCreated: z.coerce.date(),
  status: z.enum(Status),
});

type FormType = z.infer<typeof schema>;

const DeviceForm = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    ...deviceService.createDevice(),
    onSuccess: (data) => {
      // telling react query to refetch data
      queryClient.invalidateQueries();
    },
  });

  const onSubmit: SubmitHandler<FormType> = (formData) => {
    console.log(
      '🚀 ~ file: DeviceForm.tsx:49 ~ DeviceForm ~ formData',
      formData,
    );
    toast.promise(mutateAsync(formData), {
      loading: 'Creating Device',
      success: 'Successfully Created device',
      error: 'Error While creating device',
    });
  };
  return (
    <Container className="container-form pt-4" fluid>
      <Row>
        <Col>
          <Stack as="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="vendor">Name</Form.Label>
              <Form.Control
                aria-describedby="vendor-help"
                type="text"
                id="vendor"
                {...register('vendor')}
              />
              {formState.errors.vendor?.message ? (
                <Form.Text id="vendor-help" className="text-danger">
                  {formState.errors.vendor.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="dateCreated">Date Created</Form.Label>
              <Form.Control
                aria-describedby="dateCreated-help"
                type="date"
                id="dateCreated"
                {...register('dateCreated')}
              />
              {formState.errors.dateCreated?.message ? (
                <Form.Text id="dateCreated-help" className="text-danger">
                  {formState.errors.dateCreated.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="status">Status</Form.Label>
              <Form.Select
                aria-describedby="status-help"
                id="status"
                {...register('status')}
              >
                {Status.map((datum) => (
                  <option value={datum} key={datum}>
                    {datum.toUpperCase()}
                  </option>
                ))}
              </Form.Select>
              {formState.errors.status?.message ? (
                <Form.Text id="status-help" className="text-danger">
                  {formState.errors.status.message}
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

export default DeviceForm;
