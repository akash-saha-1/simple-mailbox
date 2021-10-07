import React from 'react';

export const HeaderHtml = () => {
  return (
    <header className="bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-12 mx-auto py-2">
            <div className="card border-0 bg-transparent">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-auto col-4 mx-auto text-nowrap text-center px-3">
                    <a href="http://themes.guide" target="_new">
                      <span className="fab fa-react display-1 text-white d-block mx-auto" />
                    </a>
                  </div>
                  <div className="col-lg text-center text-lg-left">
                    <h1 className="font-weight-light d-inline">
                      <span className="text-light">React Inbox App</span>
                    </h1>
                    <h6>A working mail box template</h6>
                    <h4 className=".d-block d-md-none">
                      Open in Desktop View for better experience
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHtml;
