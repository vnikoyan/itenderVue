<template>
  <div v-if="currentPlan" class="row p-4 border-bottom mx-0 shadow">
    <div class="col-lg-8">
      <div class="form-group row">
        <label for="example-text-input" class="col-sm-2 col-form-label text-right">Պատվիրատու</label>
        <div class="col-sm-10">
          <span class="form-control" id="example-text-input">ՋՐԱՅԻՆ ԿԱՌՈՒՅՑՆԵՐԻ ՓԲԸ</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input01" class="col-sm-2 col-form-label text-right">Տարեթիվ</label>
        <div class="col-sm-10">
          <span id="example-date-input01">2020-08-26</span>
        </div>
      </div>
      <div class="form-group row">
        <label for="example-email-input" class="col-sm-2 col-form-label">Ծածկագիր</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" value="ասդասդասդ" id="example-email-input">
        </div>
      </div>

      <div class="form-group row">
        <label for="example-tel-input" class="col-sm-2 col-form-label">Անվանում</label>
        <div class="col-sm-10">
          <input class="form-control" type="tex" value="abcafij" id="example-tel-input">
        </div>
      </div>

      <div class="form-group row">
        <label for="example-password-input" class="col-sm-2 col-form-label">Ֆինանսական
          աղբյուր</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" value=""
                 placeholder="ՋՐԱՅԻՆ ԿԱՌՈՒՅՑՆԵՐԻ ՓԲԸ-ի եկամուտների և ծախսերի 2019թ նախահաշիվ"
                 id="example-password-input">
        </div>
      </div>

      <div class="form-group row">
        <label for="example-number-input" class="col-sm-2 col-form-label text-right">Կազմող</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" value="Հայկ Ղազարյան" id="example-number-input">
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="w-100 h-100 d-flex flex-column justify-content-between">
        <div class="row file-box-content file-bloc">
          <div class="col-md-4">
            <div @click.prevent="downloadPlan('pdf')" style="cursor: pointer;" class="file-box">
              <a class="download-icon-link">
                <i class="dripicons-download file-download-icon"></i>
              </a>
              <div class="text-center">
                <i class="far fa-file-code text-danger"></i>
                <h6 class="text-muted">Արտահանել գնումների պլանը</h6>
                <small class="text-muted">(pdf)</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div @click.prevent="downloadPlan('xlsx')" style="cursor: pointer;" class="file-box">
              <a href="#" class="download-icon-link">
                <i class="dripicons-download file-download-icon"></i>
              </a>
              <div class="text-center">
                <i class="far fa-file-excel text-success"></i>
                <h6 class="text-muted">Արտահանել գնումների պլանը </h6>
                <small class="text-muted">(excel)</small>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="file-box">
              <a href="#" class="download-icon-link">
                <i class="dripicons-download file-download-icon"></i>
              </a>
              <div class="text-center">
                <i class="far fa-file-excel text-success"></i>
                <h6 class="text-muted">Արտահանել գնումների պլանը ըստ <br>ֆինանսական դասակարգիչի </h6>
                <small class="text-muted">(excel)</small>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-12 text-right">
            <button v-if="isRoot && currentPlan.status === 0"
                    @click="approvePlan"
                    class="btn btn-gradient-secondary waves-effect">
              <span v-if="planApproving" class="mr-3 spinner-border spinner-border-sm" role="status"
                    aria-hidden="true"></span>
              Հաստատել պլանը
            </button>
            <button v-if="currentPlan.status === 1" type="button"
                    class="btn btn-success btn-square btn-skew waves-effect waves-light">
              <span>
                  <i class="mdi mdi-check-all mr-2"></i>Հաստատված է
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlanHeader',
    data() {
      return {
        planApproving: false,
        alertTimout: null,
      }
    },
    computed: {
      isRoot() {
        return this.$store.getters['user/isRoot']
      },
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
    },
    methods: {
      approvePlan() {
        if (this.alertTimout) clearTimeout(this.alertTimout)
        this.planApproving = true
        this.$client.put(`procurement/approve/${this.currentPlan.id}`).then(response => {
          if (response.data.status) {
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Պլանը հաջողությամբ հաստատված է!'
            })
            this.$store.dispatch('procurement/getPlans', this.currentPlan.id)
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Դուք չեք կարող հաստատել պլանը!',
              text: 'Որոշ գնման առարկաները դեռևս չեն հաստատվել'
            })
          }
          this.planApproving = false
        })
      },
      downloadPlan(ext) {
        this.$client.get('procurement-plan/getFilePdf/' + this.currentPlan.id, {
          responseType: 'blob',
        }).then(response => {
          const file = response.data
          let type = 'pdf'
          if (ext === 'xlsx') {
            type = 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
          console.log(file, 'file')
          const blob = new Blob([file], { type: 'application/' + type })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `${this.currentPlan.name}.${ext}`

          link.click()
        })
      },
    },
  }
</script>
