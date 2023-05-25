import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SeatDetails from './SeatDetails';
import Layout from './../../Core/Layout';
import { getBusBySlug } from '../../../Utils/Requests/Bus';
import Loading from './../../Core/Loading';


function Seats(props) {
	const [sold, setSold] = useState([]);
	const [booked, setBooked] = useState([]);
	const [numberOfSeats, setNumberOfSeats] = useState(0);
	const [error, setError] = useState('');
	const [details, setDetails] = useState({ name: 'Bus' });
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { slug } = useParams();

	useEffect(() => {
		fetchAllBookingDetails();
	}, []);

	const fetchAllBookingDetails = async () => {
		const resp = await getBusBySlug(slug).catch(err => {
			setError(err.response.data.error);
			setLoading(false);
		});
		console.log(resp);
		if (resp && resp.status === 200) {
			setDetails(resp.data);
			setBooked(resp.data.bookedSeat);
			setSold(resp.data.soldSeat);
			setNumberOfSeats(resp.data.numberOfSeats);
			setLoading(false);
		}
	};

	return (
		<Layout title="Seat Details">
			<h1 className="mt-2 text-primary">{`Seat Details of ${details.name}`}</h1>
			{loading ? (
				<Loading />
			) : (
				<>
					{details.isAvailable !== true ? (
						navigate("/")
					) : (
						<SeatDetails
							sold={sold}
							setSold={setSold}
							booked={booked}
							setBooked={setBooked}
							slug={slug}
							numberOfSeats={numberOfSeats}
						/>
					)}
				</>
			)}
		</Layout>
	);
}

export default Seats;
