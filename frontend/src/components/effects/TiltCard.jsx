const TiltCard = ({ children, className = "", style, ...props }) => {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default TiltCard;
