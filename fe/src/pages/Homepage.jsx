import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { post } from "../API/Api";
import { get, deleteReq } from "../API/Api";
import { Link } from "react-router-dom";
const Homepage = () => {
  const [inputs, setInputs] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [books, setAllbooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, genre, publicationYear, available, description } =
      inputs;
    if (!title || !author || !genre || !publicationYear || !available) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Please Fill the fields");
      return;
    }

    const bookData = {
      title,
      author,
      genre,
      publicationYear,
      available,
      description,
    };

    try {
      const response = await post("/books", bookData);
      console.log(response);
      getAllBooks();
      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage("Book Added ");
      setInputs({});
    } catch (error) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Failed To Add Book");
      setInputs({});
    }
  };

  const getAllBooks = async () => {
    try {
      const res = await get("/books");
      if (res) {
        console.log(res, "res");
        setAllbooks(res.books);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchBooks(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const deleteBook = async (id) => {
    const confirmBox = window.confirm("Do you really want to delete this?");
    if (confirmBox === true) {
      await deleteReq(`/books/${id}`);
      getAllBooks();
    }
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchBooks = async (term) => {
    try {
      const res = await get(`/search?query=${term}`);

      const books = res;
      console.log("Search results:", books);

      setAllbooks(res);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mt-5">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="p-2 bd-highlight">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add Book
                </button>
              </div>
              <div class="p-2 bd-highlight">
                <input
                  type="text"
                  className="form-control"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search by title , genre  or author"
                />
              </div>
            </div>

            <div
              className="modal fade"
              id="staticBackdrop"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" >
                      Add Book
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <fieldset>
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <input
                            value={inputs.title || ""}
                            name="title"
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Title"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Author</label>
                          <input
                            value={inputs.author || ""}
                            name="author"
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Author"
                          />
                        </div>
                        {inputs.type || ""}
                        <div className="mb-3">
                          <label className="form-label">Genre</label>
                          <input
                            value={inputs.genre || ""}
                            name="genre"
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Genre"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Publication Year</label>
                          <input
                            type="date"
                            value={inputs.publicationYear || ""}
                            name="publicationYear"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Publication Year"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Available</label>
                          <input
                            type="text"
                            value={inputs.available || ""}
                            name="available"
                            onChange={handleChange}
                            placeholder="Available Or Not"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            type="text"
                            value={inputs.description || ""}
                            name="description"
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <button type="input" className="btn btn-primary w-100">
                          Save
                        </button>

                        {showAlert && (
                          <div
                            className={`alert alert-${alertVariant} alert-dismissible fade show`}
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
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {books ? (
            books.map((el) => {
              const { title, author, genre, available, _id } = el;
              return (
                <>
                  <div className="col-md-3 mt-3 mb-3">
                    <div class="card text-start">
                      <Link to={`/book/${_id}`} style={{ cursor: "pointer" }}>
                        <img
                          class="card-img-top"
                          src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
                          alt="Title"
                        />
                      </Link>

                      <div class="card-body">
                        <h4 class="card-title">{title ? title : "No Title"}</h4>
                        <p class="card-text">
                          Author : {author ? author : "No author"}
                          <br />
                          Genre : {genre ? genre : "No author"}
                          <span
                            onClick={() => {
                              deleteBook(_id);
                            }}
                            style={{ float: "right", cursor: "pointer" }}
                          >
                            <img
                              width="25"
                              src="https://img.icons8.com/?size=512&id=102350&format=png"
                              alt=""
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h1>No Record Found</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
