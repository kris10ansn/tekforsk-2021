const formatDate = (date) => {
    const dateTimeFormat = new Intl.DateTimeFormat("no", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return dateTimeFormat.format(date);
};

const ctPointValues = (ctPointElement) =>
    ctPointElement
        .getAttribute("ct:value")
        .split(",")
        .map(Number)
        .map((value, i) => (i === 0 ? new Date(value) : value));

const select = ({ date, value }) => () => {
    const element = document.querySelector("#selected-point");
    const pointElements = [
        ...document.querySelectorAll(".ct-series .ct-point"),
    ];
    const pointElement = pointElements.find(
        (it) => it.getAttribute("ct:value") === `${date.getTime()},${value}`
    );

    pointElements.forEach((it) => {
        it.style.stroke = "";
    });
    pointElement.style.stroke = "green";

    element.innerHTML = `
        <h1>Capture for ${formatDate(date)}</h1>
        <p>Value: ${value}</p>
    `;
};

window.addEventListener("load", () =>
    fetch("/images")
        .then((it) => it.json())
        .then((images) =>
            images.map(({ time, value }) => ({
                x: new Date(time),
                y: value,
            }))
        )
        .then((images) => {
            const chart = new Chartist.Line(
                "#chart",
                {
                    series: [
                        {
                            name: "data",
                            data: images,
                        },
                    ],
                },
                {
                    axisX: {
                        type: Chartist.FixedScaleAxis,
                        divisor: 5,
                        labelInterpolationFnc: (_, index) => {
                            const date = images[index].x;
                            return formatDate(date);
                        },
                    },
                }
            );

            chart.on("draw", ({ type }) => {
                if (type === "line") {
                    const points = chart.svg._node.querySelectorAll(
                        ".ct-point"
                    );
                    points.forEach((point) => {
                        const [date, value] = ctPointValues(point);

                        point.addEventListener(
                            "click",
                            select({ date, value })
                        );
                    });
                }
            });
        })
);
