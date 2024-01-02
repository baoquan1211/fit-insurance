function AlertIcon({
  width = 32,
  height = 32,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <span className="fill-primary text-primary">
      <svg
        viewBox="0 0 24 24"
        focusable="false"
        data-icon="info"
        fill="currentColor"
        aria-hidden="true"
        width={width}
        height={height}
      >
        <path
          clipRule="evenodd"
          d="M12 3.5a8.5 8.5 0 104.27 15.85.75.75 0 11.76 1.3 10 10 0 114.23-4.86.75.75 0 11-1.39-.57A8.5 8.5 0 0012 3.5zm0 6.91c.41 0 .75.34.75.75v5.05a.75.75 0 01-1.5 0v-5.05c0-.41.34-.75.75-.75zm.84-2.61a.84.84 0 11-1.68 0 .84.84 0 011.68 0z"
          fillRule="evenodd"
        ></path>
      </svg>
    </span>
  );
}

export default AlertIcon;
