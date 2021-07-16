<template>
  <ContentLoader class="flex flex-col items-center rounded" width="100%" height="200px">
    <ContentLoader class="mt-3 rounded" width="90%" height="40px" animation-duration="2s" />
    <ContentLoader class="mt-3 rounded" width="80%" height="40px" animation-duration="2.3s" />
    <ContentLoader class="mt-3 rounded" width="80%" height="40px" animation-duration="2.7s" />
    <ContentLoader class="mt-3 rounded" width="80%" height="40px" animation-duration="2.9s" />
  </ContentLoader>
</template>

<script>
import ContentLoader from '../../components/ContentLoader';

export default {
  components: { ContentLoader },
};
</script>

<style></style>
