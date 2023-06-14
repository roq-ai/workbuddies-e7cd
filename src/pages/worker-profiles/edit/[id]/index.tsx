import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getWorkerProfileById, updateWorkerProfileById } from 'apiSdk/worker-profiles';
import { Error } from 'components/error';
import { workerProfileValidationSchema } from 'validationSchema/worker-profiles';
import { WorkerProfileInterface } from 'interfaces/worker-profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function WorkerProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<WorkerProfileInterface>(
    () => (id ? `/worker-profiles/${id}` : null),
    () => getWorkerProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: WorkerProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateWorkerProfileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/worker-profiles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<WorkerProfileInterface>({
    initialValues: data,
    validationSchema: workerProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Worker Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="skills" mb="4" isInvalid={!!formik.errors?.skills}>
              <FormLabel>Skills</FormLabel>
              <Input type="text" name="skills" value={formik.values?.skills} onChange={formik.handleChange} />
              {formik.errors.skills && <FormErrorMessage>{formik.errors?.skills}</FormErrorMessage>}
            </FormControl>
            <FormControl id="experience" mb="4" isInvalid={!!formik.errors?.experience}>
              <FormLabel>Experience</FormLabel>
              <Input type="text" name="experience" value={formik.values?.experience} onChange={formik.handleChange} />
              {formik.errors.experience && <FormErrorMessage>{formik.errors?.experience}</FormErrorMessage>}
            </FormControl>
            <FormControl id="availability" mb="4">
              <FormLabel>Availability</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.availability ? new Date(formik.values?.availability) : null}
                  onChange={(value: Date) => formik.setFieldValue('availability', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'worker_profile',
  operation: AccessOperationEnum.UPDATE,
})(WorkerProfileEditPage);
