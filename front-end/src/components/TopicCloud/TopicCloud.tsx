import type { Topic } from "../../types/article";
import "./TopicCloud.css";

interface TopicCloudProps {
  topics: Topic[];
}

const TopicCloud = ({ topics }: TopicCloudProps) => {
  return (
    <section className="topics" aria-labelledby="topics-title">
      <h2 id="topics-title" className="topics__title">Explore Nodes</h2>
      <div className="topics__list">
        {topics.map((topic) => (
          <a key={topic.slug} href="#" className="topics__tag">
            {topic.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default TopicCloud;
