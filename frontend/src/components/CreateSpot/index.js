import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddSpot } from "../../store/spotsReducer";
import { useHistory } from "react-router-dom";
import "./CreateSpot.css";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!country) errors.Country = "Country is required";

    if (!address) errors.Address = "Address is required";

    if (!city) errors.City = "City is required";

    if (!state) errors.State = "State is required";

    if (description.length < 30) {
      errors.Description = "Description needs a minimum of 30 characters";
    }

    if (!name) errors.Name = "Name is required";

    if (!price) errors.Price = "Price is required";

    if (
      !previewImage.endsWith(".jpeg") &&
      !previewImage.endsWith(".jpg") &&
      !previewImage.endsWith(".png")
    ) {
      errors.PreviewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (!previewImage) errors.PreviewImage = "Preview image is required";

    if (
      photo2.length > 0 &&
      !photo2.endsWith(".jpeg") &&
      !photo2.endsWith(".jpg") &&
      !photo2.endsWith(".png")
    ) {
      errors.Photo2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (
      photo3.length > 0 &&
      !photo3.endsWith(".jpeg") &&
      !photo3.endsWith(".jpg") &&
      !photo3.endsWith(".png")
    ) {
      errors.Photo2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (
      photo4.length > 0 &&
      !photo4.endsWith(".jpeg") &&
      !photo4.endsWith(".jpg") &&
      !photo4.endsWith(".png")
    ) {
      errors.Photo2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (
      photo5.length > 0 &&
      !photo5.endsWith(".jpeg") &&
      !photo5.endsWith(".jpg") &&
      !photo5.endsWith(".png")
    ) {
      errors.Photo2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    const errorContent = Object.values(errors);
    if (errorContent.length) return setValidationErrors(errors);

    const formInfo = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    const imageInfo = [
      { url: previewImage, preview: true },
      { url: photo2, preview: false },
      { url: photo3, preview: false },
      { url: photo4, preview: false },
      { url: photo5, preview: false },
    ];

    let spotId = await dispatch(thunkAddSpot(formInfo, imageInfo)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    history.push(`/spots/${spotId}`);

    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImage("");
    setPhoto2("");
    setPhoto3("");
    setPhoto4("");
    setPhoto5("");
    setValidationErrors([]);
    setErrors([]);
  };

  return (
    <div className="form">
      <div className="form-inner">
        <h2>Create a new Spot</h2>
        <form onSubmit={onSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <h3>Where's your place located?</h3>
          <label>
            Guests will only get your exact address once they booked a
            reservation.
          </label>
          <div className="form-row">
            <div></div>
            <label>Country</label>
            <input
              id="country"
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder="Country"
            />
            {validationErrors.Country && (
              <div className="error-msg">* {validationErrors.Country}</div>
            )}
          </div>
          <div className="form-row">
            <label>Street Address</label>
            <input
              id="address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
            />
            {validationErrors.Address && (
              <div className="error-msg">* {validationErrors.Address}</div>
            )}
          </div>
          <div className="city-state">
            <div className="form-row">
              <label>City</label>
              <input
                id="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City"
              />
              {validationErrors.City && (
                <div className="error-msg">* {validationErrors.City}</div>
              )}
            </div>
            <div className="form-row">
              <label>State</label>
              <input
                id="state"
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder="STATE"
              />
              {validationErrors.State && (
                <div className="error-msg">* {validationErrors.State}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <h3>Describe your place to guests</h3>
            <label>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </label>
            <input
              id="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
            />
            {validationErrors.Description && (
              <div className="error-msg">* {validationErrors.Description}</div>
            )}
          </div>
          <div className="form-row">
            <h3>Create a title for your spot</h3>
            <label>
              Catch guest's attention with a spot title that highlights what
              makes your place special.
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name of your spot"
            />
            {validationErrors.Name && (
              <div className="error-msg">* {validationErrors.Name}</div>
            )}
          </div>
          <div className="form-row">
            <h3>Set a base price for your spot</h3>
            <label>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </label>
            <input
              id="price"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price per night (USD)"
            />
            {validationErrors.Price && (
              <div className="error-msg">* {validationErrors.Price}</div>
            )}
          </div>
          <div className="form-row">
            <h3>Liven up your spot with photos</h3>
            <label>
              Submit a link to at least one photo to publish your spot.
            </label>
            <input
              id="previewImage"
              type="url"
              onChange={(e) => setPreviewImage(e.target.value)}
              value={previewImage}
              placeholder="Preview Image URL"
            />
            {validationErrors.PreviewImage && (
              <div className="error-msg">* {validationErrors.PreviewImage}</div>
            )}
            <input
              id="photo2"
              type="url"
              onChange={(e) => setPhoto2(e.target.value)}
              value={photo2}
              placeholder="Image URL"
            />
            {validationErrors.Photo2 && (
              <div className="error-msg">* {validationErrors.Photo2}</div>
            )}
            <input
              id="photo3"
              type="url"
              onChange={(e) => setPhoto3(e.target.value)}
              value={photo3}
              placeholder="Image URL"
            />
            {validationErrors.Photo3 && (
              <div className="error-msg">* {validationErrors.Photo3}</div>
            )}
            <input
              id="photo4"
              type="url"
              onChange={(e) => setPhoto4(e.target.value)}
              value={photo4}
              placeholder="Image URL"
            />
            {validationErrors.Photo4 && (
              <div className="error-msg">* {validationErrors.Photo4}</div>
            )}
            <input
              id="photo5"
              type="url"
              onChange={(e) => setPhoto5(e.target.value)}
              value={photo5}
              placeholder="Image URL"
            />
            {validationErrors.Photo5 && (
              <div className="error-msg">* {validationErrors.Photo5}</div>
            )}
          </div>
          <div className="submit-button">
            <button style={{ backgroundColor: "red", color: "white" }}>Create a Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
}
