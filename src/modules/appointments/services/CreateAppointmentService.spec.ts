import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'user',
      provider_id: '21321343',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('21321343');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: '21321343',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user',
        provider_id: '21321343',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
