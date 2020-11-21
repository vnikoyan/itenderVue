<template>
    <div>
        <section id="slider">
            <VueSlickCarousel v-bind="settings" class="main-slider box-slider slick-initialized slick-slider" >
                <div class="single-slide">
                    <img src="assets/landing/images/slider-1.png" alt="img">
                    <div class="test123 slide-content">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 col-sm-6">
                                       <div class="slide-article">
                                            <h1 class="wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.5s">{{ $t('home.slider.title_1') }}</h1>
                                            <p class="wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.75s"></p>
                                            <a class="read-more-btn wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s"
                                            href="#">{{ $t('home.btn_read_more') }}</a>
                                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="single-slide">
                    <img src="assets/landing/images/slider-2.png" alt="img">
                    <div class="test123 slide-content">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 col-sm-6">
                                    <div class="slide-article">
                                            <h1 class="wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.5s">
                                              {{ $t('home.slider.title_2') }}
                                            </h1>
                                            <p class="wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.75s"></p>
                                            <a class="read-more-btn wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s"
                                            href="#"> {{ $t('home.btn_read_more') }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-slide">
                    <img src="assets/landing/images/slider-3.jpg" alt="img">
                    <div class="test123 slide-content">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 col-sm-6">
                                    <div class="slide-article">
                                        <h1 class="wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.5s"> {{ $t('home.slider.title_3') }}</h1>
                                        <p class="wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.75s"></p>
                                        <a class="read-more-btn wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s"
                                        href="#">{{ $t('home.btn_read_more') }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </VueSlickCarousel>
        </section>
        <section id="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="title-area">
                            <h2 class="title"> {{ $t('home.about_sustem.title') }}</h2>
                            <span class="line"></span>
                            <p> {{ $t('home.about_sustem.paragraph') }}</p>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="feature-content">
                            <div class="row">
                                <h3 class="title col-12">{{ $t('home.about_sustem.subtitle') }}</h3>
                                <div class="col-lg-4 col-sm-6 p-0">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-shopping-basket feature-icon" aria-hidden="true"></i>
                                        <h4 class="feat-title">{{ $t('home.opportunities_1.title_1') }}</h4>
                                        <p class="feature">{{ $t('home.opportunities_1.description_1') }}</p>
                                        <p>
                                            <a class="open_review" href="opportunity_tender.html#scroll_to_01" data-id="3">
                                               {{ $t('home.about_sustem.btn_more') }}
                                              <i class="fa fa-long-arrow-right"></i></a>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-info feature-icon"></i>
                                        <h4 class="feat-title">{{ $t('home.opportunities_1.title_2') }}</h4>
                                        <p class="feature">{{ $t('home.opportunities_1.description_2') }}</p>
                                        <p>
                                            <a class="open_review" href="opportunity_tender.html#scroll_to_01" data-id="3">
                                              {{ $t('home.about_sustem.btn_more') }}
                                              <i class="fa fa-long-arrow-right"></i></a>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6 p-0">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-question feature-icon" ></i>
                                        <h4 class="feat-title">{{ $t('home.opportunities_1.title_3') }}</h4>
                                        <p class="feature">
                                          {{ $t('home.opportunities_1.description_3') }}
                                        </p>
                                        <p>
                                            <a class="open_review" href="opportunity_tender.html#scroll_to_01" data-id="3">
                                              {{ $t('home.about_sustem.btn_more') }}
                                              <i class="fa fa-long-arrow-right"></i></a>
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <h3 class="title col-12"> {{ $t('home.about_sustem.subtitle_2') }}</h3>
                                <div class="col-lg-4 col-sm-6 p-0">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-file-o feature-icon"></i>
                                        <h4 class="feat-title"> {{ $t('home.opportunities_2.title_1') }} </h4>
                                        <p class="feature">
                                          {{ $t('home.opportunities_2.description_1') }}
                                        </p>
                                        <p>
                                            <a class="open_review" href="opportunity_tender.html#scroll_to_1" data-id="3">
                                              {{ $t('home.about_sustem.btn_more') }}
                                              <i class="fa fa-long-arrow-right"></i></a>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-sitemap feature-icon"></i>
                                        <h4 class="feat-title">{{ $t('home.opportunities_2.title_2') }}</h4>
                                        <p class="feature">
                                          {{ $t('home.opportunities_2.description_2') }}
                                        </p>
                                        <p>
                                            <a class="open_review" href="opportunity_tender.html#scroll_to_2" data-id="3">
                                              {{ $t('home.about_sustem.btn_more') }}
                                              <i class="fa fa-long-arrow-right"></i></a>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6 p-0">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-pencil-square-o feature-icon"></i>
                                        <h4 class="feat-title">{{ $t('home.opportunities_2.title_3') }} </h4>
                                        <p class="feature">
                                          {{ $t('home.opportunities_2.description_3') }}
                                        </p>
                                        <p>
                                            <a class="open_review" href="opportunity_tender.html#scroll_to_3" data-id="3">
                                              {{ $t('home.about_sustem.btn_more') }}
                                              <i class="fa fa-long-arrow-right"></i></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
        <News></News>
                <div class="row bloc-subscribe container">
            <a class="blog-more-btn subscribe-2" href="#subscribe"> {{ $t('home.latest-news.btn_subscribe') }}
                <i class="fa fa-arrow-down"></i>
            </a>
        </div>
        <section id="counter">
            <div class="counter-overlay"   v-waypoint="{ active: true, callback: onWaypoint }">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="counter-area">
                                <div class="row">
                                    <!-- Start single counter -->
                                    <div class="col-md-2 col-area">
                                        <div class="single-counter">
                                            <div class="counter-icon">
                                                <i class="fa fa-suitcase"></i>
                                            </div>
                                            <div class="counter-no counter" >
                                                <ICountUp :delay="1000" :endVal="1275"   :options="options" ref="ICountUp1"  />
                                            </div>
                                            <div class="counter-label">
                                            {{ $t('home.counter.title_1') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-area">
                                        <div class="single-counter">
                                            <div class="counter-icon">
                                                <i class="fa fa-clock-o"></i>
                                            </div>
                                            <div class="counter-no counter" >
                                                <ICountUp :delay="1000" :endVal="5275"   :options="options" ref="ICountUp2"  />

                                            </div>
                                            <div class="counter-label">
                                              {{ $t('home.counter.title_2') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-area">
                                        <div class="single-counter">
                                            <div class="counter-icon">
                                                <i class="fa fa-trophy"></i>
                                            </div>
                                            <div class="counter-no counter">
                                                <ICountUp :delay="1000" :endVal="350"   :options="options" ref="ICountUp3"  />
                                            </div>
                                            <div class="counter-label">
                                              {{ $t('home.counter.title_3') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-area">
                                        <div class="single-counter">
                                            <div class="counter-icon">
                                                <i class="fa fa-users"></i>
                                            </div>
                                            <div class="counter-no counter">
                                                <ICountUp :delay="1000" :endVal="875"   :options="options" ref="ICountUp4"  />
                                            </div>
                                            <div class="counter-label">
                                              {{ $t('home.counter.title_4') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-area">
                                        <div class="single-counter">
                                            <div class="counter-icon">
                                                <i class="fa fa-user"></i>
                                            </div>
                                            <div class="counter-no counter">
                                                <ICountUp :delay="1000" :endVal="150"   :options="options" ref="ICountUp5"  />
                                            </div>
                                            <div class="counter-label">
                                              {{ $t('home.counter.title_5') }}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="latest-news02">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="title-area">
                            <h2 class="title">{{ $t('home.video.title') }}</h2>
                            <span class="line"></span>
                            <p></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="latest-news-content">
                            <div class="row latest-video-content__sider">
                                <div class="col-md-4">
                                    <article class="blog-news-single">
                                        <iframe width="360" height="315" src="https://www.youtube.com/embed/JCzX-KckpfU"
                                                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
                                    </article>
                                </div>
                                <div class="col-md-4">
                                    <article class="blog-news-single">

                                        <iframe width="360" height="315" src="https://www.youtube.com/embed/EO-zBCmk6hg"
                                                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>


                                    </article>
                                </div>
                                <div class="col-md-4">
                                    <article class="blog-news-single">
                                        <iframe width="360" height="315" src="https://www.youtube.com/embed/iyvxJZouJF8"
                                                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>

                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="pricing-table">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="title-area">
                            <h2 class="title"> {{ $t('home.pricing-table_1.title') }}</h2>
                            <span class="line"></span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <h3 class="title">{{ $t('home.pricing-table_1.state.title') }}</h3>
                        <div class="feature-content">
                            <div class="row">
                                <h3 class="title col-lg-12">{{ $t('home.pricing-table_1.state.subtitle') }}</h3>
                                <div class="col-md-4 col-sm-6">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-pencil-square-o feature-icon"></i>
                                        <h4 class="feat-title">{{ $t('home.pricing-table_1.state.title_1') }}</h4>

                                        <p class="plan">{{ $t('home.pricing-table_1.state.description_1') }}</p>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-sitemap feature-icon"></i>
                                        <h4 class="feat-title">{{ $t('home.pricing-table_1.state.title_2') }}</h4>
                                        <p class="plan">{{ $t('home.pricing-table_1.state.description_2') }}</p>

                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="single-feature wow zoomIn">
                                        <i class="fa fa-file-text-o feature-icon"></i>
                                        <h4 class="feat-title">{{ $t('home.pricing-table_1.state.title_3') }}</h4>
                                        <p class="plan">{{ $t('home.pricing-table_1.state.description_3') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PricingState is_state="false"></PricingState>
                    </div>
                    <div class="col-md-12">
                        <h3 class="title "> {{ $t('home.pricing-table_1.private.title') }}</h3>
                        <div class="feature-content">
                            <div class="row">
                                <h3 class="title col-lg-12">{{ $t('home.pricing-table_1.private.subtitle') }}</h3>
                                <div class="col-md-12 col-sm-12">
                                    <div class="single-feature wow zoomIn">
                                        <p class="plan">{{ $t('home.pricing-table_1.private.description_1') }}</p>
                                        <p class="plan">{{ $t('home.pricing-table_1.private.description_2') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pricing is_state="false"></Pricing>
                    </div>
                </div>
            </div>
        </section>

        <section id="subscribe">
            <div class="subscribe-overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="subscribe-area">
                                <h2 class="wow fadeInUp">{{ $t('home.subscribe-area.title') }}</h2>
                                <form action="" class="subscrib-form wow fadeInUp" data-wow-duration="0.5s"
                                    data-wow-delay="0.5s">
                                    <input type="text" :placeholder="$t('home.subscribe-area.placeholder')">
                                    <button class="subscribe-btn" type="submit">{{ $t('home.btn_send') }}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'
import News from '@/components/landing/News'
import Pricing from '@/components/landing/Pricing'
import PricingState from '@/components/landing/PricingState'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import WOW from 'wowjs';


export default {

    mounted() {
        new WOW.WOW({
            live: false,
        }).init();
        console.log('Component mounted.')
    },
    created:function () {

    },
    methods: {
         onWaypoint ({ going, direction }) {
        // going: in, out
        // direction: top, right, bottom, left
            if ((going === this.$waypointMap.GOING_IN) && this.scroll === false ) {
                   for (let i = 1; i < 6; i++) {
                        this.$refs["ICountUp"+i].reset()
                        this.$refs["ICountUp"+i].start()
                 }
                this.scroll = true;
            }
            if (direction === this.$waypointMap.DIRECTION_TOP) {
                console.log('waypoint going top!')
            }
        }
    },
    data() {
      return {
        scroll:false,
        settings: {
            "dots": true,
            "arrow": true
         },
         columns: [
            {data: 'id', name: 'id'},
            {data: 'title', name: 'title'}
         ],
        options: {
          useEasing: true,
          useGrouping: true,
          separator: '',
          decimal: '.',
          prefix: '',
          suffix: '',
        }
      }
    },
    name: 'MyComponent',
    components: {VueSlickCarousel,News,Pricing,PricingState},
  }
</script>

<style  scoped>
  @import '/assets/landing/css/slick.css';
  @import '/assets/landing/css/animate.css';
</style>
