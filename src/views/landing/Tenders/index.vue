<template>
    <div>
        <section id="single-page-header">
            <div class="overlay">
                <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="single-page-header-left">
                        <h2>{{ $t('tenders.single_header') }}</h2>
                    </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="single-page-header-right">
                        <ol class="breadcrumb float-right">
                        <li class="breadcrumb-item">    {{ $t('menu.home') }} </li>
                        <li class="breadcrumb-item active"> {{ $t('menu.tenders') }} </li>
                        </ol>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section id="table">
            <div class="container">
                <div class="row">
                    <div class="contact-area-left">
                        <h4>{{ $t('tenders.title_3') }}</h4>
                        <p>{{ $t('tenders.subtitle') }} </p>
                        <v-server-table :url="tableDataUrl" :columns="columns" :options="options">
                            <template v-slot:process_all="{row}">
                                <span :key="item.procurement_plan.id" v-for="item in row.process_all">
                                    {{item.procurement_plan.cpv.name}}
                                </span>
                            </template>
                        </v-server-table>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>

export default {
    data() {
      return {
         columns: [
           'title',
           'code',
           'process_all',
           'deadline'
         ],
         tableDataUrl: `${process.env.VUE_APP_API_URL}tender`,
         options:{
            headings: {
                title: 'Անվանումը',
                code: 'Ծածկագիր',
                process_all: 'Տեսակը',
                deadline: 'Ժամկետը ավարտ',
            },
           columnsDropdown: true,
           texts: {
            count:
              'Ցուցադրված է {from}֊ից {to}֊ը ընդհանուր {count} տողից|{count} տող|',
            first: 'Առաջին',
            last: 'Վերջին',
            filter: '',
            filterPlaceholder: 'Փնտրել',
            limit: '',
            page: 'Page:',
            noResults: 'Համընկնում չի գտնվել',
            noRequest: 'խնդրում ենք ընտրել առնվազն մեկ ֆիլտեր տվյալները ներբեռնելու համար',
            filterBy: 'փնտրել ըստ {column}',
            loading: 'Բեռնվում է...',
            defaultOption: 'ընտրել {column}',
            columns: 'Ընտրել դաշտերը',
          },
          skin: 'table table-hover'
         }
      }
    },
    name: 'TenderComponent',
    components: {}
  }
</script>
<style  scoped>
  @import '/assets/landing/css/slick.css';
  @import '/assets/landing/css/animate.css';
</style>
