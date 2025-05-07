<script setup lang="ts">
const { $get } = use$fetch();
const { $isLoading } = use$status();

const topSubjectList = ref<Subject[]>([]);
const topTopicList = ref<TopicWithSubjectAndTags[]>([]);
const loadTopSubjectList = async () => {
  $get<Subject[]>(
    "/user/subject/top",
    (v) => {
      if (v) {
        topSubjectList.value = v;
      }
    },
    { noLoading: false }
  );
};
const loadLatestSubjectList = async () => {
  $get<Subject[]>(
    "/user/subject/latest",
    (v) => {
      if (v) {
        topSubjectList.value = v;
      }
    },
    { noLoading: false }
  );
};

const loadTopTopicList = async () => {
  $get<TopicWithSubjectAndTags[]>("/user/topic/top", (v) => {
    if (v) {
      topTopicList.value = v;
    }
  });
};

const loadLatestTopicList = async () => {
  $get<TopicWithSubjectAndTags[]>("/user/topic/latest", (v) => {
    if (v) {
      topTopicList.value = v;
    }
  });
};

const loadData = () => {
  $isLoading.value = true;
  Promise.all([loadTopSubjectList(), loadTopTopicList()])
    .then()
    .finally(() => {
      $isLoading.value = false;
    });
};

const subjectTabs = ref<HomeBoxTab[]>([
  {
    key: "recommend",
    title: "推荐专题",
  },
  {
    key: "latest",
    title: "最新专题",
  },
]);
const topicTabs = ref<HomeBoxTab[]>([
  {
    key: "top",
    title: "热门文章",
  },
  {
    key: "latest",
    title: "最新文章",
  },
]);

const subjectCurrentTab = ref("recommend");
const topicCurrentTab = ref("top");

const changeSubjectTab = async (tab: string) => {
  subjectCurrentTab.value = tab;
  if (tab === "latest") {
    await loadLatestSubjectList();
  } else {
    await loadTopSubjectList();
  }
};

const changeTopicTab = async (tab: string) => {
  topicCurrentTab.value = tab;
  if (tab === "latest") {
    await loadLatestTopicList();
  } else {
    await loadTopTopicList();
  }
};

loadData();
</script>

<template>
  <HomeBox
    :tabs="subjectTabs"
    :current-tab="subjectCurrentTab"
    href="/subject"
    more-text="全部专题"
    @change="changeSubjectTab"
  >
    <SubjectTop
      v-if="topSubjectList && topSubjectList.length > 0"
      :list="topSubjectList"
    />
    <div v-else>
      <Icon name="eos-icons:loading" size="1.5rem" class="text-gray-600" />
    </div>
  </HomeBox>

  <HomeBox
    :tabs="topicTabs"
    :current-tab="topicCurrentTab"
    href="/topic"
    more-text="全部文章"
    class="my-3"
    @change="changeTopicTab"
  >
    <TopicList
      :topic-list="topTopicList"
      :item-with-border="true"
      v-if="topTopicList && topTopicList.length > 0"
      class="space-y-4"
    />
    <div v-else>
      <Icon name="eos-icons:loading" size="1.5rem" class="text-gray-600" />
    </div>
  </HomeBox>
</template>
