const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <div>
        <p className="text-3xl font-medium tracking-wider capitalize">{text}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
