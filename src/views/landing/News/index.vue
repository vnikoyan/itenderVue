<template>
    <div>
        <section id="single-page-header">
        <div class="overlay">
            <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="single-page-header-left">
                    <h2>ՎԵՐՋԻՆ ՆՈՐՈՒԹՅՈՒՆՆԵՐԸ</h2>
                    <p>Համակարգում առկա է պետական մրցույթներին մասնակցության հայտերի ավտոմատ պատրաստման գործիք</p>
                </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="single-page-header-right">
                    <ol class="breadcrumb float-right">
                    <li class="breadcrumb-item"><a href="index.html">Գլխավոր</a></li>
                    <li class="breadcrumb-item active">ՆՈՐՈՒԹՅՈՒՆՆԵՐԸ</li>
                    </ol>

                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section id="blog-archive">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="blog-archive-area">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="blog-archive-left">
                                        <!-- Start blog news single -->
                                        <article class="blog-news-single">
                                            <div class="blog-news-img">
                                                <img :src="`${news.image}`" :alt="`${news.title[$i18n.locale]}`">
                                            </div>
                                            <div class="blog-news-title">
                                                <h2>{{news.title[$i18n.locale]}}</h2>
                                                <p>By <a class="blog-author" href="#">Admin</a> <span class="blog-date">|{{news.created_at}}</span></p>
                                            </div>
                                            <div class="blog-news-details blog-single-details" v-html="news.description[$i18n.locale]"></div>
                                            <div class="blog-news-details blog-single-details">
                                                <div class="blog-single-bottom">
                                                    <div class="row">
                                                        <div class="col-md-8">
                                                        <div class="blog-single-tag">
                                                            <span class="fa fa-tags"></span>
                                                            <a href="#">Design,</a>
                                                            <a href="#">Photoshop,</a>
                                                            <a href="#">Development</a>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                        <div class="blog-single-social">
                                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                                            <a href="#"><i class="fa fa-linkedin"></i></a>
                                                            <a href="#"><i class="fa fa-google-plus"></i></a>
                                                            <a href="#"><i class="fa fa-pinterest"></i></a>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
    </div>
</template>

<script>

export default {
    mounted() {
        this.$store.dispatch('news/show',this.$route.params.id)
    },
    computed: {
        news() {
            return this.$store.getters['news/eventShow']
        }
    },
    data() {
      return {
          
      }
    },
    name: 'NewsShowComponent',
    components: {}
  }
</script>
<style scoped>
    .accordion>.card>.card-header{
        background: #f1f5fa;
    }
</style>