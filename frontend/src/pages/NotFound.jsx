import React from "react";

const NotFound = () => {
  return (
    <section
      className="slice slice-lg vh-100 bg-gradient-primary overflow-hidden"
      data-offset-top="#header-main"
    >
      <div className="bg-absolute-cover vh-100 overflow-hidden">
        <figure className="w-100">
          <img
            alt="Image placeholder"
            src="../img/svg/backgrounds/bg-4.svg"
            className="svg-inject"
          />
        </figure>
      </div>
      <div className="container h-100 d-flex align-items-center position-relative zindex-100">
        <div className="col">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <h6 className="h1 mb-5 font-weight-400 text-white">
                Internal Server Error
              </h6>
              <a
                href="/dashboard"
                className="btn btn-white btn-icon rounded-pill hover-translate-y-n3"
              >
                <span className="btn-inner--icon"><i className="fas fa-home"></i></span>
                <span className="btn-inner--text">Return home?</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="position-absolute bottom-0 right-4 overflow-hidden">
        <figure className="w-50">
          <img
            alt="Image placeholder"
            src="../img/svg/illustrations/design-thinking.svg"
            className="svg-inject opacity-2"
          />
        </figure>
      </div>
    </section>
  );
};

export default NotFound;
