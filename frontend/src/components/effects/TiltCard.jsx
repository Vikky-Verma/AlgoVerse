const TiltCard = ({ children, className = "", style, maxTilt, ...props }) => {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default TiltCard;

