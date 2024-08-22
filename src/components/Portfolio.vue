<script>
import { supabase } from '../../lib/supabase/supabase.js'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded';

export default {
  data() {
    return {
      projects: [],
      portfolioIsotope: null,
    }
  },
  async created() {
    const { data: projects, error } = await supabase.from('projects').select('*')
    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      console.info('Ok fetching projects:', projects)
      this.projects = projects
    }
  },
  mounted() {
    this.initializeIsotope();
  },
  updated() {
    this.$nextTick(() => {
      if (this.portfolioIsotope) {
        this.portfolioIsotope.reloadItems();
        this.portfolioIsotope.layout();
      }
    });
  },
  methods: {
    initializeIsotope() {
      this.$nextTick(() => {
        this.portfolioIsotope = new Isotope('.portfolio-container', {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        const filterButtons = document.querySelectorAll('#portfolio-flters li');
        filterButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');
            this.portfolioIsotope.arrange({ filter: filterValue });
          });
        });

        // Si quieres asegurarte de que las imágenes están cargadas antes de inicializar Isotope
        const imgLoad = imagesLoaded('.portfolio-container');
        imgLoad.on('progress', () => {
          this.portfolioIsotope.layout();
        });
      });
    }
  }
}
</script>



<template>
  <div class="container">
    <div class="position-relative d-flex align-items-center justify-content-center">
      <h1 class="display-1 text-uppercase text-white" style="-webkit-text-stroke: 1px #dee2e6;">Galeria</h1>
      <h1 class="position-absolute text-uppercase text-primary">Mi Portfolio</h1>
    </div>
    <div class="row">
      <div class="col-12 text-center mb-2">
        <ul class="list-inline mb-4" id="portfolio-flters">
          <li class="btn btn-sm btn-outline-primary m-1 active"  data-filter="*">Todo</li>
          <li class="btn btn-sm btn-outline-primary m-1" data-filter=".writings">Escritos</li>
          <li class="btn btn-sm btn-outline-primary m-1" data-filter=".photography">Fotograficos</li>
          <li class="btn btn-sm btn-outline-primary m-1" data-filter=".videos">Videos</li>
        </ul>
      </div>
    </div>
    <div class="row portfolio-container" style="min-height: 17em;overflow-y:hidden; height: max-content ">
      <!-- Aquí puedes generar dinámicamente los elementos del portafolio -->
      <div v-for="project in projects" :key="project.id" :class="['col-lg-4 col-md-6 mb-4 portfolio-item', project.class_name]">
        <div class="position-relative overflow-hidden mb-2">
          <img class="img-fluid rounded w-100" :src="project.img_url" :alt="project.title">
          <div class="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
            <a :href="project.link"  class="btn" target="_blank" :title="project.title" data-bs-toggle="tooltip">
              <i class="fa fa-plus text-white" style="font-size: 60px;"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tooltip-inner {
  background-color: #1853e7 !important;
  color: #fff;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 1em !important;
}
.tooltip-arrow {
  border-top-color: #333 !important;
}
</style>