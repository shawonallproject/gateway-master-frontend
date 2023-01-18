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

type Props = {
  gatewayId: string;
  onClose: () => void;
};

const Status = ['online', 'offline'] as const;

const schema = z.object({
  Vendor: z.string().min(2, 'Must be at least 2 characters').optional(),
  UID: z.coerce.number(),
  OnlineStatus: z.coerce.boolean(),
});

type FormType = z.infer<typeof schema>;

const DeviceForm = ({ gatewayId, onClose }: Props) => {
  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    ...deviceService.createDevice(),
    onSuccess: (data) => {
      // telling react query to refetch data
      queryClient.invalidateQueries();
      onClose();
    },
  });

  const onSubmit: SubmitHandler<FormType> = (formData) => {
    toast.promise(
      mutateAsync({
        ...formData,
        Gateway: gatewayId,
      }),
      {
        loading: 'Creating Device',
        success: 'Successfully Created device',
        error: 'Error While creating device',
      },
    );
  };
  return (
    <Container className="container-form pt-4" fluid>
      <Row>
        <Col>
          <Stack as="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="Vendor">Vendor</Form.Label>
              <Form.Control
                aria-describedby="Vendor-help"
                type="text"
                id="Vendor"
                {...register('Vendor')}
              />
              {formState.errors.Vendor?.message ? (
                <Form.Text id="Vendor-help" className="text-danger">
                  {formState.errors.Vendor.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="UID">UID</Form.Label>
              <Form.Control
                aria-describedby="UID-help"
                type="number"
                id="UID"
                {...register('UID')}
              />
              {formState.errors.UID?.message ? (
                <Form.Text id="UID-help" className="text-danger">
                  {formState.errors.UID.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="OnlineStatus">Status</Form.Label>
              <Form.Select
                aria-describedby="OnlineStatus-help"
                id="OnlineStatus"
                {...register('OnlineStatus')}
              >
                {Status.map((datum) => (
                  <option
                    value={datum === 'online' ? 'true' : 'false'}
                    key={datum}
                  >
                    {datum.toUpperCase()}
                  </option>
                ))}
              </Form.Select>
              {formState.errors.OnlineStatus?.message ? (
                <Form.Text id="OnlineStatus-help" className="text-danger">
                  {formState.errors.OnlineStatus.message}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Button type="submit" className="mt-5">
              {isLoading ? 'Saving' : 'Save'}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default DeviceForm;
