<template>
  <div class="card">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-sm-3">
          <multiselect
            v-model="filters.status"
            label="name"
            track-by="value"
            :options="filters.statusOptions"
            :searchable="false"
            :close-on-select="false"
            :show-labels="false"
            :allow-empty="false"
            placeholder="Կարգավիճակ"
          />
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col-12 tenders-list p-0">
            <v-client-table :columns="columns" v-model="data" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: { Multiselect },
    data() {
      return {
        columns: ['customer', 'product', 'category', 'create_date', 'end_date'],
        data: this.getData(),
        options: {
          sortable: ['customer', 'product', 'category', 'create_date', 'end_date'],
          // hiddenColumns: ['price', 'invite'],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table',
          dateColumns:['create_date','end_date'],
          dateFormat: "YYYY-mm-dd",
          headings: {
            customer: 'Պատվիրատու',
            product: 'Գնման Առարկա',
            category: 'Խումբ / Կատեգորիա',
            create_date: 'Հրապարակման օր',
            end_date: 'Ավարտ',
          },
          filterable: false
        },
        filters: {
          status: { name: 'Բոլորը', value: 'all' },
          statusOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Ակտիվ հարցումներ', value: 'active' },
            { name: 'Ավարտված հարցումներ', value: 'finished' },
          ],
        }
      }
    },
    computed: {
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      locale() {
        return this.$store.getters['user/locale']
      }
    },
    mounted() {
      
    },
    methods: {
      getData() {
        return [
              {
                "code": "646759332-00000",
                "customer": "Duis A Mi Incorporated",
                "product": "libero est,",
                "category": "id",
                "create_date": "Aug 26, 2021",
                "end_date": "2020-10-09 13:34:24",
                "price": "֏74310.00"
              },
              {
                "code": "683493977-00006",
                "customer": "Vitae Corporation",
                "product": "in lobortis",
                "category": "vitae",
                "create_date": "Jul 28, 2021",
                "end_date": "2021-05-11 14:57:47",
                "price": "֏42014.02"
              },
              {
                "code": "493901086-00006",
                "customer": "Nonummy Ipsum PC",
                "product": "euismod mauris",
                "category": "In",
                "create_date": "May 26, 2021",
                "end_date": "2021-02-04 12:41:16",
                "price": "֏90893.97"
              },
              {
                "code": "824550941-00002",
                "customer": "Curabitur Egestas Incorporated",
                "product": "lectus convallis",
                "category": "consectetuer",
                "create_date": "Jan 2, 2021",
                "end_date": "2020-05-27 17:28:39",
                "price": "֏96082.45"
              },
              {
                "code": "084682350-00008",
                "customer": "Diam LLP",
                "product": "nec, eleifend",
                "category": "vulputate,",
                "create_date": "Jan 4, 2021",
                "end_date": "2021-02-05 17:34:59",
                "price": "֏35535.13"
              },
              {
                "code": "679979641-00009",
                "customer": "Feugiat Corporation",
                "product": "semper erat,",
                "category": "purus,",
                "create_date": "Nov 4, 2020",
                "end_date": "2021-08-17 07:18:26",
                "price": "֏14483.80"
              },
              {
                "code": "847500105-00006",
                "customer": "Felis Adipiscing Fringilla Inc.",
                "product": "Sed nunc",
                "category": "eu",
                "create_date": "Nov 24, 2021",
                "end_date": "2020-09-14 14:39:08",
                "price": "֏75213.79"
              },
              {
                "code": "456067016-00000",
                "customer": "Sed Limited",
                "product": "eros nec",
                "category": "massa",
                "create_date": "Feb 14, 2020",
                "end_date": "2021-12-27 09:35:58",
                "price": "֏52854.33"
              },
              {
                "code": "082749839-00005",
                "customer": "Magna A Incorporated",
                "product": "ipsum. Suspendisse",
                "category": "sapien,",
                "create_date": "Oct 3, 2020",
                "end_date": "2021-07-27 19:52:41",
                "price": "֏72484.71"
              },
              {
                "code": "118710847-00005",
                "customer": "Nec Diam Ltd",
                "product": "sodales. Mauris",
                "category": "non,",
                "create_date": "Dec 1, 2021",
                "end_date": "2020-07-27 20:10:13",
                "price": "֏23563.67"
              },
              {
                "code": "226283539-00006",
                "customer": "Dignissim Maecenas Incorporated",
                "product": "adipiscing ligula.",
                "category": "ac,",
                "create_date": "Feb 20, 2020",
                "end_date": "2021-07-22 19:03:03",
                "price": "֏40946.76"
              },
              {
                "code": "628752941-00003",
                "customer": "Ac Consulting",
                "product": "sollicitudin commodo",
                "category": "sollicitudin",
                "create_date": "Jun 23, 2020",
                "end_date": "2021-05-10 10:18:42",
                "price": "֏94442.64"
              },
              {
                "code": "498463751-00004",
                "customer": "Ullamcorper Inc.",
                "product": "dictum eleifend,",
                "category": "nulla.",
                "create_date": "Apr 7, 2021",
                "end_date": "2021-02-04 12:38:20",
                "price": "֏44553.13"
              },
              {
                "code": "988504296-00001",
                "customer": "Enim LLP",
                "product": "Duis sit",
                "category": "non,",
                "create_date": "Sep 5, 2021",
                "end_date": "2020-06-26 06:22:06",
                "price": "֏63837.63"
              },
              {
                "code": "068374230-00008",
                "customer": "Est Incorporated",
                "product": "eget laoreet",
                "category": "enim.",
                "create_date": "Jan 14, 2020",
                "end_date": "2020-11-24 21:49:47",
                "price": "֏2308.25"
              },
              {
                "code": "944377571-00004",
                "customer": "Sed Inc.",
                "product": "vitae, aliquet",
                "category": "sed,",
                "create_date": "Jan 7, 2021",
                "end_date": "2020-02-13 22:10:33",
                "price": "֏81214.24"
              },
              {
                "code": "178215240-00007",
                "customer": "Cubilia Curae; PC",
                "product": "interdum libero",
                "category": "lobortis.",
                "create_date": "Jun 2, 2021",
                "end_date": "2021-02-17 12:22:42",
                "price": "֏50811.23"
              },
              {
                "code": "951032440-00004",
                "customer": "Elit Erat Foundation",
                "product": "est arcu",
                "category": "fringilla,",
                "create_date": "Mar 9, 2021",
                "end_date": "2021-06-14 22:16:16",
                "price": "֏30451.97"
              },
              {
                "code": "213076110-00005",
                "customer": "Mauris Suspendisse Consulting",
                "product": "non, sollicitudin",
                "category": "ipsum.",
                "create_date": "May 10, 2021",
                "end_date": "2021-08-05 10:41:15",
                "price": "֏31368.60"
              },
              {
                "code": "866030661-00007",
                "customer": "Velit Eget Corporation",
                "product": "Curabitur dictum.",
                "category": "Curae;",
                "create_date": "Feb 8, 2021",
                "end_date": "2020-05-14 15:01:56",
                "price": "֏77283.80"
              },
              {
                "code": "796180305-00008",
                "customer": "Molestie Inc.",
                "product": "egestas blandit.",
                "category": "massa",
                "create_date": "Jun 1, 2020",
                "end_date": "2020-05-11 09:09:42",
                "price": "֏22971.07"
              },
              {
                "code": "073299935-00004",
                "customer": "Lacinia Incorporated",
                "product": "adipiscing, enim",
                "category": "turpis",
                "create_date": "Dec 16, 2020",
                "end_date": "2021-10-29 06:46:15",
                "price": "֏32210.49"
              },
              {
                "code": "699907820-00004",
                "customer": "Et Libero Corporation",
                "product": "elit, a",
                "category": "mollis",
                "create_date": "Sep 11, 2021",
                "end_date": "2020-08-19 18:25:12",
                "price": "֏26002.16"
              },
              {
                "code": "779730167-00003",
                "customer": "Arcu Inc.",
                "product": "dictum sapien.",
                "category": "iaculis,",
                "create_date": "Dec 29, 2020",
                "end_date": "2020-05-19 07:24:18",
                "price": "֏56490.26"
              },
              {
                "code": "949321624-00007",
                "customer": "Et Rutrum Non Corp.",
                "product": "Etiam bibendum",
                "category": "luctus.",
                "create_date": "Mar 5, 2021",
                "end_date": "2021-02-21 21:18:29",
                "price": "֏64201.92"
              },
              {
                "code": "396363418-00007",
                "customer": "Dui Limited",
                "product": "nunc. In",
                "category": "sagittis",
                "create_date": "Feb 26, 2020",
                "end_date": "2020-10-13 22:48:14",
                "price": "֏53945.09"
              },
              {
                "code": "353298011-00001",
                "customer": "Vestibulum Massa Limited",
                "product": "vehicula aliquet",
                "category": "mauris",
                "create_date": "Jul 8, 2021",
                "end_date": "2021-07-25 19:41:02",
                "price": "֏31394.68"
              },
              {
                "code": "871557591-00009",
                "customer": "Primis Limited",
                "product": "Quisque varius.",
                "category": "egestas",
                "create_date": "Jun 23, 2021",
                "end_date": "2020-10-27 18:34:16",
                "price": "֏23406.51"
              },
              {
                "code": "537937534-00007",
                "customer": "Sociosqu Ad LLC",
                "product": "tincidunt nibh.",
                "category": "magna,",
                "create_date": "Jun 9, 2020",
                "end_date": "2020-03-18 08:27:32",
                "price": "֏32535.43"
              },
              {
                "code": "716803283-00002",
                "customer": "Feugiat Corporation",
                "product": "at pretium",
                "category": "tincidunt",
                "create_date": "Aug 27, 2021",
                "end_date": "2022-02-15 03:44:28",
                "price": "֏78627.83"
              },
              {
                "code": "988246351-00007",
                "customer": "Augue Id Company",
                "product": "mauris blandit",
                "category": "Nunc",
                "create_date": "Jul 11, 2020",
                "end_date": "2021-03-01 10:02:20",
                "price": "֏27946.48"
              },
              {
                "code": "861300671-00000",
                "customer": "Phasellus Libero Mauris Foundation",
                "product": "dolor. Nulla",
                "category": "fermentum",
                "create_date": "Jun 17, 2021",
                "end_date": "2020-06-02 02:57:43",
                "price": "֏90019.84"
              },
              {
                "code": "848566907-00004",
                "customer": "Arcu Sed Eu Industries",
                "product": "lacus. Etiam",
                "category": "sapien.",
                "create_date": "Feb 10, 2020",
                "end_date": "2021-02-26 22:01:38",
                "price": "֏80565.10"
              },
              {
                "code": "935197152-00009",
                "customer": "Mauris Ut PC",
                "product": "eget, dictum",
                "category": "sed,",
                "create_date": "Nov 29, 2020",
                "end_date": "2021-10-21 04:17:38",
                "price": "֏14560.68"
              },
              {
                "code": "708322250-00000",
                "customer": "Nec Ante Maecenas Ltd",
                "product": "Pellentesque tincidunt",
                "category": "felis",
                "create_date": "Oct 1, 2020",
                "end_date": "2021-01-19 04:13:34",
                "price": "֏99974.41"
              },
              {
                "code": "166073486-00002",
                "customer": "Sapien Cursus In Limited",
                "product": "gravida nunc",
                "category": "ipsum",
                "create_date": "Mar 2, 2020",
                "end_date": "2021-12-18 13:44:14",
                "price": "֏27022.68"
              },
              {
                "code": "380233270-00004",
                "customer": "Cubilia Corporation",
                "product": "cubilia Curae;",
                "category": "velit.",
                "create_date": "Jan 28, 2021",
                "end_date": "2020-10-10 19:20:50",
                "price": "֏28475.17"
              },
              {
                "code": "466296134-00003",
                "customer": "Eros Nec Tellus LLC",
                "product": "pede. Nunc",
                "category": "nec",
                "create_date": "May 11, 2021",
                "end_date": "2021-04-13 07:08:26",
                "price": "֏73533.04"
              },
              {
                "code": "430560391-00004",
                "customer": "Mauris LLP",
                "product": "libero at",
                "category": "egestas",
                "create_date": "Oct 16, 2020",
                "end_date": "2021-08-21 20:13:39",
                "price": "֏63394.69"
              },
              {
                "code": "968120386-00006",
                "customer": "Mi Eleifend Inc.",
                "product": "bibendum sed,",
                "category": "leo,",
                "create_date": "Oct 5, 2021",
                "end_date": "2021-11-25 07:36:14",
                "price": "֏70621.75"
              },
              {
                "code": "611191297-00005",
                "customer": "Diam Corporation",
                "product": "dui, nec",
                "category": "ornare.",
                "create_date": "Oct 3, 2020",
                "end_date": "2020-05-07 18:02:06",
                "price": "֏53635.63"
              },
              {
                "code": "177076577-00002",
                "customer": "Magna Consulting",
                "product": "rhoncus. Proin",
                "category": "interdum",
                "create_date": "Nov 4, 2020",
                "end_date": "2020-06-13 07:53:13",
                "price": "֏63490.75"
              },
              {
                "code": "054384268-00006",
                "customer": "Elit Consulting",
                "product": "elementum at,",
                "category": "eu",
                "create_date": "Apr 12, 2021",
                "end_date": "2020-04-07 22:04:52",
                "price": "֏85660.28"
              },
              {
                "code": "126974732-00003",
                "customer": "Leo Cras Incorporated",
                "product": "molestie sodales.",
                "category": "blandit",
                "create_date": "Sep 7, 2020",
                "end_date": "2021-10-20 12:16:15",
                "price": "֏56155.99"
              },
              {
                "code": "074416678-00006",
                "customer": "Pede Malesuada Vel Limited",
                "product": "odio. Nam",
                "category": "Cras",
                "create_date": "Nov 24, 2021",
                "end_date": "2021-12-30 11:42:02",
                "price": "֏96184.56"
              },
              {
                "code": "462397126-00006",
                "customer": "Integer Urna Vivamus Industries",
                "product": "Fusce mi",
                "category": "luctus",
                "create_date": "May 27, 2021",
                "end_date": "2021-02-16 07:07:45",
                "price": "֏82699.30"
              },
              {
                "code": "671617124-00001",
                "customer": "Vitae Semper Egestas Industries",
                "product": "Duis elementum,",
                "category": "tristique",
                "create_date": "Jan 21, 2021",
                "end_date": "2021-09-17 06:37:48",
                "price": "֏48415.22"
              },
              {
                "code": "301661195-00000",
                "customer": "Eu Nibh Vulputate LLP",
                "product": "massa rutrum",
                "category": "vulputate,",
                "create_date": "Jul 16, 2020",
                "end_date": "2020-03-11 02:03:27",
                "price": "֏35363.57"
              },
              {
                "code": "700355357-00000",
                "customer": "Duis Sit Ltd",
                "product": "Integer vulputate,",
                "category": "Nullam",
                "create_date": "May 4, 2020",
                "end_date": "2020-09-17 06:10:12",
                "price": "֏30767.88"
              },
              {
                "code": "725695209-00009",
                "customer": "Nullam Scelerisque Neque Incorporated",
                "product": "montes, nascetur",
                "category": "semper",
                "create_date": "May 8, 2020",
                "end_date": "2021-11-17 17:15:02",
                "price": "֏27186.78"
              },
              {
                "code": "072940935-00009",
                "customer": "Velit Consulting",
                "product": "Duis gravida.",
                "category": "Phasellus",
                "create_date": "Feb 2, 2022",
                "end_date": "2021-08-26 12:06:11",
                "price": "֏63459.79"
              },
              {
                "code": "129843488-00005",
                "customer": "Et Malesuada Inc.",
                "product": "erat vel",
                "category": "lorem,",
                "create_date": "Mar 16, 2021",
                "end_date": "2020-08-01 11:45:32",
                "price": "֏70719.23"
              },
              {
                "code": "351112198-00004",
                "customer": "Est Corporation",
                "product": "scelerisque mollis.",
                "category": "sit",
                "create_date": "Jan 3, 2022",
                "end_date": "2021-11-26 02:37:30",
                "price": "֏31744.84"
              },
              {
                "code": "882947500-00006",
                "customer": "Donec Fringilla Donec Corp.",
                "product": "Integer tincidunt",
                "category": "laoreet",
                "create_date": "Oct 5, 2021",
                "end_date": "2020-02-15 08:08:07",
                "price": "֏3980.02"
              },
              {
                "code": "626005094-00000",
                "customer": "Lacus Vestibulum Lorem Company",
                "product": "mi eleifend",
                "category": "Fusce",
                "create_date": "Feb 6, 2020",
                "end_date": "2020-05-26 12:05:31",
                "price": "֏1668.38"
              },
              {
                "code": "160676250-00006",
                "customer": "Phasellus At Augue Ltd",
                "product": "morbi tristique",
                "category": "tempor",
                "create_date": "Aug 17, 2020",
                "end_date": "2021-12-04 05:12:10",
                "price": "֏35209.05"
              },
              {
                "code": "376367827-00007",
                "customer": "Dignissim Foundation",
                "product": "elit fermentum",
                "category": "Cum",
                "create_date": "Jun 9, 2021",
                "end_date": "2021-08-29 21:33:35",
                "price": "֏85837.00"
              },
              {
                "code": "002249183-00001",
                "customer": "Semper Pretium Institute",
                "product": "pretium neque.",
                "category": "arcu.",
                "create_date": "Jun 11, 2020",
                "end_date": "2022-01-28 18:31:50",
                "price": "֏70518.79"
              },
              {
                "code": "125135897-00002",
                "customer": "Ultricies Dignissim Lacus LLP",
                "product": "dolor elit,",
                "category": "aliquet",
                "create_date": "Jan 9, 2020",
                "end_date": "2020-10-01 13:37:24",
                "price": "֏88780.99"
              },
              {
                "code": "913040523-00007",
                "customer": "Donec Elementum Lorem Company",
                "product": "laoreet posuere,",
                "category": "eu",
                "create_date": "Mar 8, 2021",
                "end_date": "2020-02-04 20:40:48",
                "price": "֏56245.22"
              },
              {
                "code": "403589054-00002",
                "customer": "Sed Sapien Associates",
                "product": "quis diam",
                "category": "Aliquam",
                "create_date": "Sep 21, 2021",
                "end_date": "2020-08-08 14:14:02",
                "price": "֏95705.60"
              },
              {
                "code": "923766067-00006",
                "customer": "Sodales LLC",
                "product": "aliquet diam.",
                "category": "lorem",
                "create_date": "Jan 31, 2021",
                "end_date": "2022-01-16 15:01:38",
                "price": "֏48437.35"
              },
              {
                "code": "524964020-00001",
                "customer": "Neque Company",
                "product": "fringilla. Donec",
                "category": "est,",
                "create_date": "Jun 26, 2020",
                "end_date": "2021-01-02 04:25:34",
                "price": "֏48392.01"
              },
              {
                "code": "813205762-00004",
                "customer": "Proin Nisl Corp.",
                "product": "luctus lobortis.",
                "category": "In",
                "create_date": "Dec 14, 2021",
                "end_date": "2020-03-16 10:00:23",
                "price": "֏33972.33"
              },
              {
                "code": "234392231-00002",
                "customer": "A Limited",
                "product": "tincidunt dui",
                "category": "scelerisque",
                "create_date": "Jun 25, 2021",
                "end_date": "2020-04-05 19:01:01",
                "price": "֏19833.13"
              },
              {
                "code": "993740638-00008",
                "customer": "Aliquet Odio Associates",
                "product": "ut, pellentesque",
                "category": "mauris",
                "create_date": "Nov 17, 2020",
                "end_date": "2021-09-09 03:41:07",
                "price": "֏53738.51"
              },
              {
                "code": "841682347-00007",
                "customer": "Fusce Ltd",
                "product": "consequat enim",
                "category": "Aenean",
                "create_date": "Dec 16, 2021",
                "end_date": "2021-10-24 21:51:15",
                "price": "֏53935.47"
              },
              {
                "code": "365521806-00007",
                "customer": "Pellentesque Ut Ipsum LLC",
                "product": "eu, eleifend",
                "category": "Quisque",
                "create_date": "Apr 15, 2020",
                "end_date": "2020-10-15 00:03:53",
                "price": "֏91991.24"
              },
              {
                "code": "774415319-00003",
                "customer": "Mollis Lectus Incorporated",
                "product": "aliquam iaculis,",
                "category": "neque",
                "create_date": "Nov 29, 2021",
                "end_date": "2020-06-14 08:26:45",
                "price": "֏64227.96"
              },
              {
                "code": "714709169-00003",
                "customer": "Nec Imperdiet Nec Associates",
                "product": "sapien. Nunc",
                "category": "porta",
                "create_date": "Nov 20, 2020",
                "end_date": "2021-07-22 15:08:29",
                "price": "֏61057.08"
              },
              {
                "code": "308892603-00009",
                "customer": "Metus Vitae Velit LLP",
                "product": "sociis natoque",
                "category": "urna",
                "create_date": "Feb 19, 2020",
                "end_date": "2021-10-02 02:05:14",
                "price": "֏33828.84"
              },
              {
                "code": "689788396-00000",
                "customer": "Nullam Ut Company",
                "product": "dignissim. Maecenas",
                "category": "leo.",
                "create_date": "Dec 8, 2021",
                "end_date": "2020-08-15 20:38:43",
                "price": "֏87767.36"
              },
              {
                "code": "190370072-00000",
                "customer": "Felis Nulla PC",
                "product": "enim. Mauris",
                "category": "tristique",
                "create_date": "Aug 28, 2020",
                "end_date": "2020-05-02 02:39:08",
                "price": "֏91017.96"
              },
              {
                "code": "852980499-00002",
                "customer": "Ornare Lectus PC",
                "product": "sagittis. Duis",
                "category": "odio",
                "create_date": "Feb 21, 2020",
                "end_date": "2021-03-10 17:29:48",
                "price": "֏3246.93"
              },
              {
                "code": "984748376-00006",
                "customer": "Parturient Montes Limited",
                "product": "faucibus lectus,",
                "category": "eleifend",
                "create_date": "Aug 18, 2021",
                "end_date": "2022-01-16 11:06:39",
                "price": "֏88152.38"
              },
              {
                "code": "941621898-00001",
                "customer": "Massa Suspendisse Eleifend Inc.",
                "product": "facilisis facilisis,",
                "category": "Nam",
                "create_date": "Apr 6, 2021",
                "end_date": "2022-02-23 20:49:01",
                "price": "֏20165.63"
              },
              {
                "code": "453472201-00004",
                "customer": "Dignissim Pharetra Nam PC",
                "product": "massa non",
                "category": "auctor,",
                "create_date": "Jun 30, 2020",
                "end_date": "2020-10-16 05:28:17",
                "price": "֏20896.97"
              },
              {
                "code": "258310101-00005",
                "customer": "Ultrices Mauris Ipsum Industries",
                "product": "amet metus.",
                "category": "tortor",
                "create_date": "Dec 20, 2021",
                "end_date": "2021-11-24 16:20:34",
                "price": "֏34572.48"
              },
              {
                "code": "992863233-00001",
                "customer": "Duis Sit Inc.",
                "product": "elit. Etiam",
                "category": "lorem",
                "create_date": "Jan 18, 2022",
                "end_date": "2021-10-31 14:56:17",
                "price": "֏84726.93"
              },
              {
                "code": "896841921-00001",
                "customer": "Sapien Aenean Massa Institute",
                "product": "ipsum dolor",
                "category": "eget",
                "create_date": "Sep 14, 2021",
                "end_date": "2020-10-26 04:54:01",
                "price": "֏90667.76"
              },
              {
                "code": "699306965-00004",
                "customer": "Phasellus Company",
                "product": "Nam tempor",
                "category": "risus.",
                "create_date": "Nov 5, 2020",
                "end_date": "2021-07-14 18:01:09",
                "price": "֏25680.80"
              },
              {
                "code": "389854464-00002",
                "customer": "Orci PC",
                "product": "lacus. Aliquam",
                "category": "ac",
                "create_date": "Oct 6, 2021",
                "end_date": "2021-07-21 07:27:25",
                "price": "֏99653.75"
              },
              {
                "code": "153857354-00002",
                "customer": "Nunc Lectus Pede Ltd",
                "product": "Aliquam nec",
                "category": "ut",
                "create_date": "Oct 11, 2020",
                "end_date": "2020-12-11 18:15:43",
                "price": "֏60696.70"
              },
              {
                "code": "100525419-00006",
                "customer": "Donec Est Nunc Corporation",
                "product": "dui nec",
                "category": "metus",
                "create_date": "Mar 12, 2021",
                "end_date": "2020-06-11 07:27:27",
                "price": "֏16554.94"
              },
              {
                "code": "947432704-00007",
                "customer": "Tincidunt Nibh Limited",
                "product": "nibh vulputate",
                "category": "sollicitudin",
                "create_date": "May 12, 2021",
                "end_date": "2021-12-25 16:03:20",
                "price": "֏50341.25"
              },
              {
                "code": "738889013-00004",
                "customer": "Justo Faucibus Lectus Institute",
                "product": "a tortor.",
                "category": "velit.",
                "create_date": "Nov 24, 2021",
                "end_date": "2022-01-03 21:32:01",
                "price": "֏1025.75"
              },
              {
                "code": "718970031-00008",
                "customer": "Orci Consectetuer Foundation",
                "product": "lorem fringilla",
                "category": "odio",
                "create_date": "Dec 11, 2020",
                "end_date": "2020-07-13 00:05:07",
                "price": "֏43105.51"
              },
              {
                "code": "906579024-00009",
                "customer": "Vulputate LLC",
                "product": "neque. Morbi",
                "category": "mauris",
                "create_date": "Apr 1, 2021",
                "end_date": "2020-08-20 21:25:14",
                "price": "֏97177.98"
              },
              {
                "code": "134694447-00001",
                "customer": "Eu Placerat PC",
                "product": "elit, a",
                "category": "mauris",
                "create_date": "Aug 19, 2021",
                "end_date": "2021-12-01 09:32:21",
                "price": "֏36257.72"
              },
              {
                "code": "343538468-00004",
                "customer": "Arcu Imperdiet Ullamcorper Inc.",
                "product": "non, dapibus",
                "category": "est",
                "create_date": "Sep 8, 2020",
                "end_date": "2022-01-29 00:05:34",
                "price": "֏65990.27"
              },
              {
                "code": "044004091-00003",
                "customer": "Donec At Arcu Limited",
                "product": "at sem",
                "category": "Maecenas",
                "create_date": "Aug 12, 2021",
                "end_date": "2020-09-20 06:52:40",
                "price": "֏92082.08"
              },
              {
                "code": "156223232-00000",
                "customer": "Nam Limited",
                "product": "turpis nec",
                "category": "dolor",
                "create_date": "Jun 9, 2021",
                "end_date": "2021-10-11 14:52:08",
                "price": "֏32701.74"
              },
              {
                "code": "576243455-00002",
                "customer": "Ante Inc.",
                "product": "ut aliquam",
                "category": "nibh",
                "create_date": "Oct 5, 2021",
                "end_date": "2020-10-07 06:30:57",
                "price": "֏34218.98"
              },
              {
                "code": "166942532-00002",
                "customer": "Turpis Vitae Foundation",
                "product": "tristique pharetra.",
                "category": "Nullam",
                "create_date": "Jul 30, 2020",
                "end_date": "2020-09-08 21:11:48",
                "price": "֏35812.12"
              },
              {
                "code": "386623821-00009",
                "customer": "Nunc Ac Sem Corporation",
                "product": "in, hendrerit",
                "category": "volutpat",
                "create_date": "Mar 8, 2021",
                "end_date": "2021-01-05 09:39:48",
                "price": "֏2326.72"
              },
              {
                "code": "335839445-00004",
                "customer": "Orci Donec Corporation",
                "product": "metus. In",
                "category": "convallis",
                "create_date": "May 4, 2021",
                "end_date": "2021-07-13 22:22:53",
                "price": "֏29489.91"
              },
              {
                "code": "874659865-00008",
                "customer": "Pharetra Quisque Ac Consulting",
                "product": "Duis risus",
                "category": "quis",
                "create_date": "Mar 14, 2020",
                "end_date": "2020-03-23 15:21:40",
                "price": "֏26164.82"
              },
              {
                "code": "301720553-00009",
                "customer": "Vulputate Incorporated",
                "product": "felis ullamcorper",
                "category": "facilisis,",
                "create_date": "Jan 30, 2022",
                "end_date": "2020-04-08 12:19:46",
                "price": "֏40768.01"
              },
              {
                "code": "196132658-00002",
                "customer": "Sed Sapien Nunc LLP",
                "product": "hendrerit consectetuer,",
                "category": "ridiculus",
                "create_date": "Jan 19, 2021",
                "end_date": "2021-11-20 11:18:47",
                "price": "֏3359.23"
              },
              {
                "code": "968239145-00004",
                "customer": "Tincidunt LLP",
                "product": "Aliquam erat",
                "category": "porta",
                "create_date": "Jun 17, 2021",
                "end_date": "2022-02-03 00:04:29",
                "price": "֏9732.00"
              }
            ];
      },
    },
  }
</script>
