<template>
    <div>
        <div class="card overflow-hidden" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-3">
                  <h5 class="text-primary" >Welcome Back !</h5>
                  <p >It will seem like simplified</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-4">
                <div class="avatar-md profile-user-wid mb-4">
                  <img
                    src="@/assets/images/users/avatar-1.jpg"
                    alt
                    class="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 class="font-size-15 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Cynthia Price</h5>
                <p class="text-muted mb-0 text-truncate" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">UI/UX Designer</p>
              </div>

              <div class="col-sm-8">
                <div class="pt-4">
                  <div class="row">
                    <div class="col-6">
                      <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">125</h5>
                      <p class="text-muted mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Projects</p>
                    </div>
                    <div class="col-6">
                      <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">$1245</h5>
                      <p class="text-muted mb-0" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Revenue</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <a href class="btn btn-primary btn-sm">
                      View Profile
                      <i class="mdi mdi-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->

        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Personal Information</h4>

            <p
              class="text-muted mb-4"
              :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''"
            >Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.</p>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Full Name :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">Cynthia Price</td>
                  </tr>
                  <tr>
                    <th scope="row" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Mobile :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">(123) 123 1234</td>
                  </tr>
                  <tr>
                    <th scope="row" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">E-mail :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">cynthiaskote@gmail.com</td>
                  </tr>
                  <tr>
                    <th scope="row" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Location :</th>
                    <td :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-darker':''">California, United States</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- end card -->

        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <h4 class="card-title mb-5" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Experience</h4>
            <div class>
              <ul class="verti-timeline list-unstyled">
                <li class="event-list active">
                  <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle bx-fade-right"></i>
                  </div>
                  <div class="media">
                    <div class="me-3">
                      <i class="bx bx-server h4 text-primary"></i>
                    </div>
                    <div class="media-body">
                      <div>
                        <h5 class="font-size-15">
                          <a href="javascript: void(0);" class="text-dark" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Back end Developer</a>
                        </h5>
                        <span class="text-primary">2016 - 19</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="event-list">
                  <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle"></i>
                  </div>
                  <div class="media">
                    <div class="me-3">
                      <i class="bx bx-code h4 text-primary"></i>
                    </div>
                    <div class="media-body">
                      <div>
                        <h5 class="font-size-15">
                          <a href="javascript: void(0);" class="text-dark" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Front end Developer</a>
                        </h5>
                        <span class="text-primary">2013 - 16</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="event-list">
                  <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle"></i>
                  </div>
                  <div class="media">
                    <div class="me-3">
                      <i class="bx bx-edit h4 text-primary"></i>
                    </div>
                    <div class="media-body">
                      <div>
                        <h5 class="font-size-15">
                          <a href="javascript: void(0);" class="text-dark" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">UI /UX Designer</a>
                        </h5>
                        <span class="text-primary">2011 - 13</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- end card -->
    </div>
</template>