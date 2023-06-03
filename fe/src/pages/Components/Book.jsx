import React, { useEffect, useState } from "react";
import { get, put } from "../../API/Api";
import Header from "../../components/Layout/Header";
import { useParams } from "react-router-dom";
import moment from 'moment'

const Book = () => {
  let { id } = useParams();
  const [book, setBook] = React.useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const getParticularBook = async () => {
    try {
      const res = await get(`/books/${id}`);
      console.log("book", res.book);
      setBook(res.book);
      setInputs(res.book);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getParticularBook();
  }, []);

  const handleChange = (e) => {
    // setInputs({ ...inputs, [e.target.value]: e.target.name });
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    const { title, author, genre, description, publicationYear, available } =
      inputs;

    if (
      !title ||
      !author ||
      !genre ||
      !description ||
      !publicationYear ||
      !available
    ) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Please Fill All Fields");
      return;
    }
    try {
      const updateData = {
        title,
        author,
        genre,
        description,
        publicationYear,
        available,
      };
      await put(`/books/${id}`, updateData);
    getParticularBook();
      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage("Data Updated");
      return;
    } catch (error) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Failed to Updated");
      console.log(error);
      return;
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
              alt="Book Cover"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h2 className="mb-4">
              Title:
              {isEditing ? (
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                />
              ) : (
                book.title
              )}
            </h2>
            <p className="lead mb-3">
              Desciption:{" "}
              {isEditing ? (
                <textarea
                  name="description"
                  className="form-control"
                  value={inputs.description}
                  onChange={handleChange}
                />
              ) : (
                <div style={{overflow:"auto"}}>{book.description}</div>
              )}
            </p>
            <p className="text-muted mb-2">
              Publication Date:{" "}
              {isEditing ? (
                <input
                  name="publicationYear"
                  className="form-control"
                  value={inputs.publicationYear}
                  type="date"
                  onChange={handleChange}
                />
              ) : (
                moment(book.publicationYear).format('DD-MM-YYYY')
              )}
            </p>
            <p className="text-muted mb-2">
              Genre:{" "}
              {isEditing ? (
                <input
                  name="genre"
                  type="text"
                  className="form-control"
                  value={inputs.genre}
                  onChange={handleChange}
                />
              ) : (
                book.genre
              )}
            </p>
            <p className="text-muted mb-2">
              Status:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="available"
                  className="form-control"
                  value={inputs.available}
                  onChange={handleChange}
                />
              ) : book.available ? (
                "Yes Available"
              ) : (
                "Not Available"
              )}
            </p>
            <p className="text-muted mb-2">
              Author:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  value={inputs.author}
                  onChange={handleChange}
                />
              ) : (
                book.author
              )}
            </p>

            {isEditing ? (
              <button className="btn btn-primary" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleUpdateClick}>
                Update
              </button>
            )}

            {showAlert && (
              <div
                className={`mt-5 alert alert-${alertVariant} alert-dismissible fade show`}
                role="alert"
              >
                {alertMessage}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
