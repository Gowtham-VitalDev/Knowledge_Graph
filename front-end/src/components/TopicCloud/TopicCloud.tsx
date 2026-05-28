import type { Topic } from "../../types/article";
import "./TopicCloud.css";

interface TopicCloudProps {
  topics: Topic[];
  onTopicClick: (slug: string) => void;
}

const TopicCloud = ({ topics, onTopicClick }: TopicCloudProps) => {
  return (
    <section className="topics" aria-labelledby="topics-title">
      <h2 id="topics-title" className="topics__title">Explore Nodes</h2>
      <div className="topics__list">
        {topics.map((topic) => (
          <button
            key={topic.slug}
            type="button"
            className="topics__tag"
            onClick={() => onTopicClick(topic.slug)}
          >
            {topic.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TopicCloud;
