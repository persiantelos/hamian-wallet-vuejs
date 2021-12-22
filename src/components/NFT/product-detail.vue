<script>
import appConfig from "@/app.config";

/**
 * Product detail component
 */
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
 
  components: { },
  data() {
    return {
      productDetail: null,
      title: "",
      creator: "",
      serial: "",
      itemDate: "",
      dateItem: "", 
      time: "",
      group: "",
      picture: "",
      assets: "",
      setId: "",

    };
  },
  
  mounted(){
    console.log('this.value',this.value)
    this.$store.state.currentPageItems[0].text = 'Item Detail';
    for(let tag of this.value.tags){
      if(tag.tag_name == 'title'){
        this.$store.state.currentPageItems[1].text = tag.content;
        this.title = tag.content
      }
      if(tag.tag_name == 'creator'){
        this.creator = tag.content
      }
      if(tag.tag_name == 'asset'){
        this.assets = tag.content
      }
    }
    this.picture = this.value.url
    console.log('this.value.item2',this.value.item)
    this.serial = this.value.item.serial
    this.group = this.value.item.group
    for(let att of this.value.attributes){
      if(att.attribute_name == 'mintdate'){
        var itemDate = new Date(att.points*1000).toISOString().split('T');
        this.dateItem = itemDate[0]
        this.time = itemDate[1].split('.')[0]
      }
      if(att.attribute_name == 'set'){
        this.setId = att.points
      }
    }

  },
  
  methods: {
    /**
     * Selected image shows
     */
    imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
    },
  },
};
</script>

<template>
<div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-6">
                <div class="product-detai-imgs">
                  <b-tabs
                    pills
                    vertical
                    nav-wrapper-class="col-md-2 col-sm-3 col-4"
                  >
                    <b-tab v-if="value.isProtected">
                      <template v-slot:title >
                        <img
                          src="@/assets/logos/protected.svg"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img" >
                        <img 
                          loading="lazy"
                          :src="picture"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                    <b-tab v-if="value.isXtorage">
                      <template v-slot:title >
                        <img
                          src="@/assets/logos/xtorage.svg"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img" >
                        <img 
                          loading="lazy"
                          :src="picture"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                    <b-tab v-if="value.isDstore">
                      <template v-slot:title >
                        <img
                          src="@/assets/logos/dstor.svg"
                          alt
                          class="img-fluid mx-auto d-block tab-img rounded"
                        />
                      </template>
                      <div class="product-img" >
                        <img 
                          loading="lazy"
                          :src="picture"
                          alt
                          class="img-fluid mx-auto d-block"
                        />
                      </div>
                    </b-tab>
                    
                  </b-tabs>
                </div>
              </div>

              <div class="col-xl-6">
                <div class="mt-3" >
                  
                  <h4 class="mt-1 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" v-if="title">Title :{{title}}</h4>
                  

                  <p class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" v-if="creator">( Create by : {{creator}} )</p>

                  <!-- <h6 class="text-success text-uppercase" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    {{ productDetail[0].discount }} Off
                  </h6> -->
                  <h5 v-if="serial" class="mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    Serial Number :
                    <b>{{serial}}</b>
                  </h5>
                  <p v-if="assets" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Asset :</b> {{assets}}
                  </p>
                  <p v-if="dateItem && time" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Mint Date :</b> {{dateItem + ' ' + time}}
                  </p>
                  <p v-if="group" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Group :</b> {{group}}
                  </p>
                  <p v-if="setId" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Set Id :</b> {{setId}}
                  </p>
                  <!-- <div class="row mb-3">
                    <div class="col-md-6">
                      <div
                        v-for="(item, index) in productDetail[0].feature"
                        :key="index"
                      >
                        <p class="text-muted" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                          <i
                            class="bx bx-unlink font-size-16 align-middle text-primary me-1"
                          ></i>
                          {{ item }}
                        </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div>
                        <p class="text-muted" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                          <i
                            class="bx bx-user-voice font-size-16 align-middle text-primary me-1"
                          ></i>
                          Bass
                        </p>
                        <p class="text-muted" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                          <i
                            class="bx bx-cog font-size-16 align-middle text-primary me-1"
                          ></i>
                          Warranty : 1 Year
                        </p>
                      </div>
                    </div>
                  </div> -->

                  <!-- <div class="product-color">
                    <h5 class="font-size-15" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Color :</h5>
                    <a
                      href="javascript: void(0);"
                      class="active"
                      v-for="(item, index) in productDetail[0].colorVariant"
                      :key="index"
                    >
                      <div class="product-color-item border rounded">
                        <img :src="item.value" alt class="avatar-md" />
                      </div>
                      <p>{{ item.key }}</p>
                    </a>
                  </div> -->
                </div>
              </div>
            </div>
            <!-- end row -->

            <!-- <div class="mt-5">
              <h5 class="mb-3">Specifications :</h5>

              <div class="table-responsive">
                <table class="table mb-0 table-bordered">
                  <tbody>
                    <tr
                      v-for="(i, index) in productDetail[0].specification"
                      :key="index"
                    >
                      <th scope="row" style="width: 400px">{{ i.key }}</th>
                      <td>{{ i.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> -->
            <!-- end Specifications -->

            <!-- <div class="mt-5">
              <h5 class="mb-4">Reviews :</h5>

              <div class="media py-3 border-bottom">
                <img
                  src="@/assets/images/users/avatar-2.jpg"
                  class="avatar-xs me-3 rounded-circle"
                  alt="img"
                />
                <div class="media-body">
                  <h5 class="mt-0 font-size-15">Brian</h5>
                  <p class="text-muted">
                    If several languages coalesce, the grammar of the resulting
                    language.
                  </p>
                  <ul class="list-inline float-sm-end">
                    <li class="list-inline-item">
                      <a href="javascript: void(0);">
                        <i class="far fa-thumbs-up me-1"></i> Like
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript: void(0);">
                        <i class="far fa-comment-dots me-1"></i> Comment
                      </a>
                    </li>
                  </ul>
                  <div class="text-muted">
                    <i class="far fa-calendar-alt text-primary me-1"></i> 5 hrs
                    ago
                  </div>
                </div>
              </div>
              <div class="media py-3 border-bottom">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="avatar-xs me-3 rounded-circle"
                  alt="img"
                />
                <div class="media-body">
                  <h5 class="mt-0 font-size-15">Denver</h5>
                  <p class="text-muted">
                    To an English person, it will seem like simplified English,
                    as a skeptical Cambridge
                  </p>
                  <ul class="list-inline float-sm-end">
                    <li class="list-inline-item">
                      <a href="javascript: void(0);">
                        <i class="far fa-thumbs-up me-1"></i> Like
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript: void(0);">
                        <i class="far fa-comment-dots me-1"></i> Comment
                      </a>
                    </li>
                  </ul>
                  <div class="text-muted">
                    <i class="far fa-calendar-alt text-primary me-1"></i> 07
                    Oct, 2019
                  </div>
                  <div class="media mt-4">
                    <img
                      src="@/assets/images/users/avatar-5.jpg"
                      class="avatar-xs me-3 rounded-circle"
                      alt="img"
                    />
                    <div class="media-body">
                      <h5 class="mt-0 font-size-15">Henry</h5>
                      <p class="text-muted">
                        Their separate existence is a myth. For science, music,
                        sport, etc.
                      </p>
                      <ul class="list-inline float-sm-end">
                        <li class="list-inline-item">
                          <a href="javascript: void(0);">
                            <i class="far fa-thumbs-up me-1"></i> Like
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a href="javascript: void(0);">
                            <i class="far fa-comment-dots me-1"></i> Comment
                          </a>
                        </li>
                      </ul>
                      <div class="text-muted">
                        <i class="far fa-calendar-alt text-primary me-1"></i> 08
                        Oct, 2019
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="media mt-3 border-bottom">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-soft bg-primary text-primary rounded-circle font-size-16"
                    >N</span
                  >
                </div>
                <div class="media-body">
                  <h5 class="mt-0 font-size-15">Neal</h5>
                  <p class="text-muted">
                    Everyone realizes why a new common language would be
                    desirable.
                  </p>
                  <ul class="list-inline float-sm-end">
                    <li class="list-inline-item">
                      <a href="javascript: void(0);">
                        <i class="far fa-thumbs-up me-1"></i> Like
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript: void(0);">
                        <i class="far fa-comment-dots me-1"></i> Comment
                      </a>
                    </li>
                  </ul>
                  <div class="text-muted">
                    <i class="far fa-calendar-alt text-primary me-1"></i> 05
                    Oct, 2019
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <!-- end row -->

    <!-- <div class="row mt-3">
      <div class="col-lg-12">
        <div>
          <h5 class="mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">Recent product :</h5>

          <div class="row">
            <div class="col-xl-4 col-sm-6">
              <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-4">
                      <img
                        src="@/assets/images/product/img-7.png"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="text-center text-md-start pt-3 pt-md-0" >
                        <h5 class="mb-3 text-truncate">
                          <a href="javascript: void(0);" class="text-dark" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''"
                            >Wirless Headphone</a
                          >
                        </h5>
                        <p class="text-muted mb-4">
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star"></i>
                        </p>
                        <h5 class="my-0">
                          <span class="text-muted me-2">
                            <del>$240</del>
                          </span>
                          <b>$225</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-4">
                      <img
                        src="@/assets/images/product/img-4.png"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="text-center text-md-start pt-3 pt-md-0">
                        <h5 class="mb-3 text-truncate">
                          <a href="javascript: void(0);" class="text-dark"
                            >Phone patterned cases</a
                          >
                        </h5>
                        <p class="text-muted mb-4">
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star"></i>
                        </p>
                        <h5 class="my-0">
                          <span class="text-muted me-2">
                            <del>$150</del>
                          </span>
                          <b>$145</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-4">
                      <img
                        src="@/assets/images/product/img-6.png"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="text-center text-md-start pt-3 pt-md-0">
                        <h5 class="mb-3 text-truncate">
                          <a href="javascript: void(0);" class="text-dark"
                            >Phone Dark Patterned cases</a
                          >
                        </h5>
                        <p class="text-muted mb-4">
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star text-warning"></i>
                          <i class="bx bxs-star"></i>
                        </p>
                        <h5 class="my-0">
                          <span class="text-muted me-2">
                            <del>$138</del>
                          </span>
                          <b>$135</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div> -->
    <!-- end row -->

</div>
</template>
