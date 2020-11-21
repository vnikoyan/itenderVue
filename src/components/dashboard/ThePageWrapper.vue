<template>
  <div class="page-wrapper">
    <div class="page-content-tab">
        <div class="row">
            <div class="col-sm-12">
                <div class="page-title-box">
                    <div class="float-right">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item "></li>
                            <li class="breadcrumb-item active">
                              {{$route.name}}
                            </li>
                        </ol>
                    </div>
                    <h4 class="page-title">{{$route.name}}</h4>
                </div><!--end page-title-box-->
            </div><!--end col-->
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">

                </div> <!-- end col -->
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                      <slot></slot>
                    </div>
                </div>
            </div>
            <footer class="footer text-center text-sm-left">&copy; 2019 - 2020
                <span class="text-muted d-none d-sm-inline-block float-right">Crafted with
                    <i class="mdi mdi-heart text-danger"></i>by
                    <a href="https://www.gsol.am/" target="_blank"> GSOL</a>
                </span>
            </footer>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pageTitle'],
}
</script>
