import { Router } from "express";
import { getAllReservations, getReservation, getReservationsUser, postReservations, patchReservationStatus, getReservationDetails, postReservationDetails } from "../controllers/reservations.controller.js";
const router = Router();

//Rutas de las reservas
router.get('/reservations', getAllReservations);
router.get('/reservations/:id_reservation', getReservation);
router.get('/reservationsuser/:id_user', getReservationsUser)
router.post('/reservations', postReservations);
router.patch('/reservations/:id_reservation', patchReservationStatus);

//Rutas de los detalles de las reservas
router.patch('/reservationsdetails/:id_reservation', getReservationDetails);
router.patch('/reservationsdetails', postReservationDetails);

export default router;