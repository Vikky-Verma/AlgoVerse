const MagneticButton = ({ as: Tag = "button", children, className = "", onClick, ...props }) => {
  return (
    <Tag className={className} onClick={onClick} {...props}>
      {children}
    </Tag>
  );
};

export default MagneticButton;
