<template>
    <div>
        <section id="single-page-header">
            <div class="overlay">
                <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="single-page-header-left">
                        <h2>{{ $t('menu.information') }}</h2>
                    </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="single-page-header-right">

                        <ol class="breadcrumb float-right">
                        <li class="breadcrumb-item">
                            <router-link to="/" class="open_review">
                                {{ $t('menu.home') }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active">{{ $t('menu.information') }}</li>
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <div class="container cont-help">
            <div class="row help-box">
                <div class="col-md-12">
                    <div class="accordion" id="accordionExample">
                        <div class="card" :key="item.id" v-for="item in info">
                            <div class="card-header" :id="`heading${item.id}`" >
                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"  :data-target="`#collapse${item.id}`"
                                    :aria-controls="`collapse${item.id}`">
                                    {{item.title[$i18n.locale]}}
                                </button>
                            </div>
                            <div :id="`collapse${item.id}`" class="collapse" :aria-labelledby="`heading${item.id}`" data-parent="#accordionExample">
                                <div class="card-body" v-html="item.description[$i18n.locale]">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <News></News>
    </div>
</template>

<script>
import News from '@/components/landing/News'

export default {
    mounted() {
        // this.$store.dispatch('info/get')
    },
    computed: {
        info() {
            return this.$store.getters['info/info']
        }
    },
    data() {
      return {

      }
    },
    name: 'InfoComponent',
    components: {News}
  }
</script>
<style scoped>
    .accordion>.card>.card-header{
        background: #f1f5fa;
    }
</style>
