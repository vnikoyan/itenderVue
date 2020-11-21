<template>
    <section id="latest-news01">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="title-area">
                        <h2 class="title">{{ $t('home.latest-news.title') }}</h2>
                        <span class="line"></span>
                        <p>{{ $t('home.latest-news.subtitle') }}</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="latest-news-content" v-if="news.length">
                            <VueSlickCarousel v-bind="settings" class="row latest-news-content__sider_1" >
                                <div :key="item.id" class="col-md-12" v-for="item in news">
                                    <article class="blog-news-single">
                                        <div class="blog-news-img">
                                            <router-link :to="`new/${item.id}`" >
                                                <img :src="`${item.image}`" :alt="`${item.title[$i18n.locale]}`">
                                            </router-link>
                                        </div>
                                        <div class="blog-news-title">
                                            <h2><router-link :to="`new/${item.id}`" >{{item.title[$i18n.locale]}}</router-link></h2>
                                        </div>
                                        <div class="blog-news-details">
                                            <!-- <p html="item.description"></p> -->
                                            <router-link :to="`new/${item.id}`" class="blog-more-btn" >{{ $t('home.btn_read_more') }}
                                                <i class="fa fa-long-arrow-right"></i>
                                            </router-link>
                                        </div>
                                    </article>
                                </div>
                            </VueSlickCarousel>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import WOW from 'wowjs';

export default {
    mounted() {
        new WOW.WOW({
            live: false
        }).init();
        this.$store.dispatch('news/get')
    },
    computed: {
        news() {
            return this.$store.getters['news/event']
        }
    },
    data() {

      return {
        settings: {
            "dots": true,
            "arrow": true,
            "slidesToShow": 3,
            "responsive":[
                 {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
         }
      }
    },
    name: 'News',
    components: { VueSlickCarousel},
  }
</script>
