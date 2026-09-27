const header = document.querySelector(".site-header")
const toggle = document.querySelector(".nav-toggle")
const nav = document.querySelector("#site-nav")

function closeNav() {
  document.body.classList.remove("nav-open")
  toggle?.setAttribute("aria-expanded", "false")
}

toggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open")
  toggle.setAttribute("aria-expanded", String(open))
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav()
})

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("nav-open")) return
  if (event.target.closest("#site-nav") || event.target.closest(".nav-toggle")) return
  closeNav()
})

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav)
})

const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8)
onScroll()
window.addEventListener("scroll", onScroll, { passive: true })

const reveals = document.querySelectorAll(".reveal")
reveals.forEach((el) => {
  const siblings = [...el.parentElement.querySelectorAll(":scope > .reveal")]
  const index = siblings.indexOf(el)
  if (index > 0) el.style.transitionDelay = `${Math.min(index, 6) * 70}ms`
})

if (reveals.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add("is-in")
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" })
  reveals.forEach((el) => observer.observe(el))
} else {
  reveals.forEach((el) => el.classList.add("is-in"))
}

document.querySelectorAll("[data-filter-scope]").forEach((scope) => {
  const toolbar = scope.querySelector(".filters")
  if (!toolbar) return
  const items = [...scope.querySelectorAll("[data-cat]")]
  const count = scope.querySelector(".filter-count")
  const empty = scope.querySelector(".filter-empty")
  const buttons = [...toolbar.querySelectorAll("[data-filter]")]
  const noun = items[0]?.classList.contains("module") ? "modules" : "photographs"

  const apply = (filter) => {
    let shown = 0
    items.forEach((item) => {
      const visible = filter === "all" || item.dataset.cat === filter
      item.hidden = !visible
      if (visible) shown += 1
    })
    buttons.forEach((button) => {
      const on = button.dataset.filter === filter
      button.classList.toggle("is-on", on)
      button.setAttribute("aria-pressed", String(on))
    })
    if (count) count.textContent = `${shown} ${noun}`
    if (empty) empty.hidden = shown !== 0
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.filter))
  })
  apply("all")
})

const shots = [...document.querySelectorAll(".shot-open")]
if (shots.length) {
  const dialog = document.createElement("dialog")
  dialog.className = "lightbox"
  dialog.innerHTML = `
    <div class="lightbox-bar">
      <button type="button" class="lightbox-nav" data-dir="-1">Previous</button>
      <button type="button" class="lightbox-nav" data-dir="1">Next</button>
      <form method="dialog"><button class="lightbox-close" value="close">Close</button></form>
    </div>
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
  `
  document.body.append(dialog)
  const image = dialog.querySelector("img")
  const caption = dialog.querySelector("figcaption")
  let cursor = 0

  const visibleShots = () => shots.filter((shot) => !shot.closest(".shot")?.hidden)

  const show = (index) => {
    const list = visibleShots()
    if (!list.length) return
    cursor = (index + list.length) % list.length
    const source = list[cursor].querySelector("img")
    const title = list[cursor].querySelector(".shot-title")?.textContent || ""
    const cat = list[cursor].querySelector(".shot-cat")?.textContent || ""
    image.src = source.currentSrc || source.src
    image.alt = source.alt
    caption.textContent = cat ? `${cat} — ${title}` : title
  }

  shots.forEach((shot) => {
    shot.addEventListener("click", () => {
      const list = visibleShots()
      show(list.indexOf(shot))
      dialog.showModal()
    })
  })

  dialog.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("click", () => show(cursor + Number(button.dataset.dir)))
  })

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      show(cursor + 1)
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      show(cursor - 1)
    }
  })
}

const form = document.querySelector("#contact-form")
if (form) {
  const status = document.querySelector("#form-status")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Town: ${data.get("town") || ""}`,
      `Interest: ${data.get("interest") || ""}`,
      "",
      String(data.get("message") || ""),
    ]
    const subject = encodeURIComponent("Project note for Redwood Electric")
    const body = encodeURIComponent(lines.join("\n"))
    window.location.href = `mailto:redwoodelectricutah@gmail.com?subject=${subject}&body=${body}`
    if (status) {
      status.textContent = "Your email app should open with this note addressed to Redwood Electric. If it does not, write redwoodelectricutah@gmail.com directly."
    }
  })
}
