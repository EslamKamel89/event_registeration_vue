import pr from '@/utils/pr';
import { ref } from 'vue';

export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
};
export type Booking = {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  status: 'pending' | 'canceled' | 'confirmed';
};

export const bookings = ref<Booking[]>([]);
export const bookingsLoading = ref<boolean>(false);
const bookingsError = ref<string | null>(null);
export const fetchBookings = async () => {
  try {
    bookingsError.value = null;
    bookingsLoading.value = true;
    const response = await fetch('http://localhost:3000/bookings');
    bookings.value = await response.json();
    if (!response.ok) {
      throw new Error('unknown error occured');
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      bookingsError.value = error.message;
    }
    bookingsError.value = 'Unknown error happend when fetching the bookings';
  }
  bookingsLoading.value = false;
};
const handleRegisteration = async (event: Event) => {
  const bookingIndex = bookings.value.findIndex((booking: Booking) => booking.eventId == event.id);
  if (bookingIndex >= 0) {
    alert('You already registered for this event ');
    return;
  }
  const newBooking: Booking = {
    id: Date.now().toString(),
    userId: '1',
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  };
  bookings.value.push(newBooking);
  try {
    const response = await fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBooking, status: 'confirmed' }),
    });
    if (response.ok) {
      const savedBookingIndex: number = bookings.value.findIndex(
        (booking: Booking) => booking.eventId == event.id,
      );
      if (savedBookingIndex >= 0) bookings.value[savedBookingIndex] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (error) {
    console.error(`Failed to save the booking to the database: ${error}`);
    bookings.value = bookings.value.filter((booking: Booking) => booking.eventId != event.id);
  }
};

const findBookingById = (id: string): number => {
  const index = bookings.value.findIndex((booking: Booking) => booking.id == id);
  return index;
};

const cancelBooking = async (bookingId: string) => {
  pr(bookingId, 'This is the booking id that will be canceled');
  const index = findBookingById(bookingId);
  if (index < 0) {
    console.error('the id of the booking not found in the booking list');
    return;
  }
  const origianlBooking = bookings.value[index];
  bookings.value.splice(index, 1);
  try {
    const response = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Booking could not be canceled');
    }
  } catch (e) {
    console.error(`Failed to cancel booking:${e}`);
    bookings.value.splice(index, 0, origianlBooking);
  }
};
export default function useBookings() {
  return {
    bookings,
    bookingsLoading,
    fetchBookings,
    handleRegisteration,
    findBookingById,
    cancelBooking,
    bookingsError,
  };
}
