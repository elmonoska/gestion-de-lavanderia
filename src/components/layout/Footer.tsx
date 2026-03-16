import { APP_NAME, AUTHOR_NAME, START_DEV_YEAR } from "../../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const displayYear = `${START_DEV_YEAR} - ${currentYear}`

  return (
    <>
      <footer className="w-full py-6 text-center capitalize bg-gray-900 text-gray-400">
        <p className="text-sm">&copy; {displayYear} {" "}
          <span className="font-bold text-sky-400">{APP_NAME}</span>. desarrollado por {" "}
          <a href="https://github.com/elmonoska" className="text-gray-100 hover:text-sky-400 transition-colors font-medium" target="_blank" rel="noreferrer">{AUTHOR_NAME}</a>.
        </p>
      </footer>
    </>
  )
}
