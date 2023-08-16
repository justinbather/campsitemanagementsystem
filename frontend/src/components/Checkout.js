import { API_URL } from "../constants";

const Checkout = () => {
return (
        <>
            <div className="container">
                <h1>Checkout</h1>
                <img src="https://i.imgur.com/EHyR2nP.png" className='image'></img>
                <h2>Price</h2>
                <h3>25$</h3>
                <form action={`${API_URL}/bookings/payment`} method="POST">
                <input type="hidden" name="product_name" value="test_product" />
                <input type="hidden" name="price" value={25 * 100} />
                    <button className="btn-checkout" type="submit" >Checkout</button>
                </form>
            </div>
        </>
    );
};

export default Checkout;