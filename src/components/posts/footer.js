/* eslint-disable react/prop-types */
export default function Footer({ caption, username }) {
  return (
    <div className="flex p-4 pt-2 pb-0">
      <p className="font-bold mr-2">{username}</p>
      <p>{caption}</p>
    </div>
  );
}
