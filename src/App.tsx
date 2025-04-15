import { useEffect } from "react";

import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { ChangeEvent, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { sendDataToGA } from "./utils/events.ts";
import { SliderInput } from "@alfalab/core-components/slider-input";
import { AmountInput } from "@alfalab/core-components/amount-input";
import { BottomSheet } from "@alfalab/core-components/bottom-sheet";
import star from "./assets/star.png";
import payment from "./assets/payment.png";
import cal from "./assets/cal.png";
import money from "./assets/money.png";

interface Month {
  text: string;
  isNumber: boolean;
  isNew: boolean;
  number: number;
  paymentSum: number;
}

const countSum = (amount: number, month: number) => {
  return (amount / 1000) * 50 * month;
};

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(10_000);
  const [thx, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [months, setMonths] = useState<Month[]>(
    [
      {
        text: "1 мес.",
        isNumber: true,
        isNew: false,
        number: 1,
        paymentSum: countSum(amount, 1),
      },
      {
        text: "3 мес.",
        isNumber: true,
        isNew: false,
        number: 3,
        paymentSum: countSum(amount, 3),
      },
      {
        text: "6 мес.",
        isNumber: true,
        isNew: false,
        number: 6,
        paymentSum: countSum(amount, 6),
      },
      {
        text: "12 мес.",
        isNumber: true,
        isNew: false,
        number: 12,
        paymentSum: countSum(amount, 12),
      },
      {
        text: "Другой",
        isNumber: true,
        isNew: false,
        number: 99,
        paymentSum: 0,
      },
    ].map((m) => {
      if (m.number === 99) {
        return m;
      } else {
        return {
          ...m,
          text: `${Math.floor(amount + m.paymentSum)}`,
        };
      }
    }),
  );
  const [month, setMonth] = useState<Month>(months[0]);
  const [modalMonth, setModalMonth] = useState<Month | null>();

  const [standardMonths, setStandardMonths] = useState<Month[]>(
    [
      {
        text: "1 мес.",
        isNumber: true,
        isNew: true,
        number: 1,
        paymentSum: countSum(amount, 1),
      },
      {
        text: "2 мес.",
        isNumber: true,
        isNew: true,
        number: 2,
        paymentSum: countSum(amount, 2),
      },
      {
        text: "3 мес.",
        isNumber: true,
        isNew: true,
        number: 3,
        paymentSum: countSum(amount, 3),
      },
      {
        text: "4 мес.",
        isNumber: true,
        isNew: true,
        number: 4,
        paymentSum: countSum(amount, 4),
      },
      {
        text: "5 мес.",
        isNumber: true,
        isNew: true,
        number: 5,
        paymentSum: countSum(amount, 5),
      },
      {
        text: "6 мес.",
        isNumber: true,
        isNew: true,
        number: 6,
        paymentSum: countSum(amount, 6),
      },
      {
        text: "7 мес.",
        isNumber: true,
        isNew: true,
        number: 7,
        paymentSum: countSum(amount, 7),
      },
      {
        text: "8 мес.",
        isNumber: true,
        isNew: true,
        number: 8,
        paymentSum: countSum(amount, 8),
      },
      {
        text: "9 мес.",
        isNumber: true,
        isNew: true,
        number: 9,
        paymentSum: countSum(amount, 9),
      },
      {
        text: "10 мес.",
        isNumber: true,
        isNew: true,
        number: 10,
        paymentSum: countSum(amount, 10),
      },
      {
        text: "11 мес.",
        isNumber: true,
        isNew: true,
        number: 11,
        paymentSum: countSum(amount, 11),
      },
      {
        text: "12 мес.",
        isNumber: true,
        isNew: true,
        number: 12,
        paymentSum: countSum(amount, 12),
      },
      {
        text: "13 мес.",
        isNumber: true,
        isNew: true,
        number: 13,
        paymentSum: countSum(amount, 13),
      },
      {
        text: "14 мес.",
        isNumber: true,
        isNew: true,
        number: 14,
        paymentSum: countSum(amount, 14),
      },
      {
        text: "15 мес.",
        isNumber: true,
        isNew: true,
        number: 15,
        paymentSum: countSum(amount, 15),
      },
      {
        text: "16 мес.",
        isNumber: true,
        isNew: true,
        number: 16,
        paymentSum: countSum(amount, 16),
      },
      {
        text: "17 мес.",
        isNumber: true,
        isNew: true,
        number: 17,
        paymentSum: countSum(amount, 17),
      },
      {
        text: "18 мес.",
        isNumber: true,
        isNew: true,
        number: 18,
        paymentSum: countSum(amount, 18),
      },
    ].map((m) => {
      return {
        ...m,
        text: `${Math.floor(amount + m.paymentSum)}`,
      };
    }),
  );

  const submit = () => {
    setLoading(true);
    sendDataToGA({
      sum: amount,
      payment: month.paymentSum + amount,
      term: month.number,
      commission: month.paymentSum,
    }).then(() => {
      setLoading(false);
      setThx(true);
      LS.setItem(LSKeys.ShowThx, true);
    });
  };

  const formatPipsValue = (value: number) =>
    `${value.toLocaleString("ru-RU")} ₽`;

  const handleSumInputChange = (
    _: ChangeEvent<HTMLInputElement>,
    { value }: { value: number | string },
  ) => {
    setAmount(Number(value) / 100);
    countSum(Number(value), month.number);
  };

  const handleSumSliderChange = ({ value }: { value: number }) => {
    setAmount(value);
    countSum(Number(value), month.number);
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  useEffect(() => {
    const newMonths = [
      ...months
        .filter((m) => m.number !== 99)
        .map((m) => ({
          ...m,
          paymentSum: countSum(amount, m.number),
          text: `${Math.floor((amount + countSum(amount, m.number)) / m.number)}`,
        })),
      {
        text: "Другой",
        isNumber: true,
        isNew: false,
        number: 99,
        paymentSum: 0,
      },
    ];

    const newStandardMonths = standardMonths.map((m) => ({
      ...m,
      paymentSum: countSum(amount, m.number),
      text: `${Math.floor((amount + countSum(amount, m.number)) / m.number)}`,
    }));

    const currentMonth =
      newMonths.find((m) => month.number === m.number) || newMonths[0];

    if (JSON.stringify(months) !== JSON.stringify(newMonths)) {
      setMonths(newMonths);
    }

    if (JSON.stringify(standardMonths) !== JSON.stringify(newStandardMonths)) {
      setStandardMonths(newStandardMonths);
    }

    if (month.text !== currentMonth.text) {
      setMonth(currentMonth);
    }
  }, [amount, month.number]);

  if (thx) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive
          font="system"
          tag="h3"
          view="medium"
          className={appSt.productsTitle}
        >
          Деньги под рукой
        </Typography.TitleResponsive>
        <Gap size={8} />
        <Typography.Text
          tag="p"
          view="primary-medium"
          style={{ marginBottom: 0, paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          Доступный лимит без процентов
        </Typography.Text>

        <Gap size={28} />

        <Typography.Text
          tag="p"
          view="primary-small"
          weight="bold"
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          Выберите сумму и срок
        </Typography.Text>

        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <SliderInput
            block={true}
            value={amount * 100}
            sliderValue={amount}
            onInputChange={handleSumInputChange}
            onSliderChange={handleSumSliderChange}
            onBlur={() => setAmount((prev) => clamp(prev, 1, 30_000))}
            min={1}
            max={30_000}
            range={{ min: 1, max: 30_000 }}
            pips={{
              mode: "values",
              values: [1, 30_000],
              format: { to: formatPipsValue },
            }}
            step={1}
            Input={AmountInput}
            labelView="outer"
            size={48}
          />
        </div>

        <Gap size={28} />

        <Swiper
          style={{ marginRight: "0", width: "100%", overflowX: "hidden" }}
          spaceBetween={8}
          slidesPerView="auto"
          updateOnWindowResize={true}
          resizeObserver={true}
        >
          {months.map((m) => (
            <SwiperSlide
              key={m.number}
              onClick={() => {
                setMonth((prev) => (m.number === 99 ? prev : m));

                if (m.number === 99) {
                  setModalOpen(true);
                }
              }}
              className={appSt.swSlide({
                selected: m.text === month.text,
              })}
            >
              {m.number === 99
                ? m.text
                : `${m.number} x ${Number(m.text).toLocaleString("ru-RU")} ₽`}
            </SwiperSlide>
          ))}
        </Swiper>

        <Gap size={28} />

        <div className={appSt.reminder}>
          <img src={star} width={24} height={24} alt="" />
          <Typography.Text
            tag="p"
            view="primary-small"
            style={{ marginBottom: 0 }}
          >
            Можно взять еще в любой момент. <br /> Лимит восстановится с
            погашением.
          </Typography.Text>
        </div>

        <Gap size={28} />
      </div>

      <BottomSheet
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Typography.Text tag="p" view="primary-large" weight="bold">
            Выберите срок
          </Typography.Text>

          <Swiper
            style={{ marginLeft: "0" }}
            spaceBetween={8}
            slidesPerView="auto"
            updateOnWindowResize={true}
            resizeObserver={true}
          >
            {standardMonths.map((m) => (
              <SwiperSlide
                key={m.number}
                onClick={() => {
                  setModalOpen(false);

                  if (m.number === month.number) {
                    return;
                  }

                  const result: Month[] = [];

                  [...months, m].forEach((m1) => {
                    if (!result.find((m2) => m2.number === m1.number)) {
                      result.push(m1);
                    }
                  });

                  setMonths([
                    ...result
                      .filter((m3) => m3.number !== modalMonth?.number)
                      .sort((a, b) => b.number - a.number),
                  ]);
                  setModalMonth(m);
                  setMonth(m);
                }}
                className={appSt.swSlide({
                  selected: m.text === month.text,
                })}
              >
                {m.number === 99
                  ? m.text
                  : `${m.number} x ${Number(m.text).toLocaleString("ru-RU")} ₽`}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </BottomSheet>

      <Gap size={96} />

      <div className={appSt.bottomBtnThx}>
        <div className={appSt.result}>
          <Typography.Text
            tag="p"
            view="primary-medium"
            style={{ marginBottom: 0, textAlign: "center" }}
          >
            Вы берете
          </Typography.Text>
          <Typography.Text
            tag="p"
            view="primary-medium"
            weight="bold"
            style={{ marginBottom: 0, textAlign: "center" }}
          >
            {amount.toLocaleString("ru-RU")} ₽
          </Typography.Text>

          <Gap size={12} />

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "73px",
              }}
            >
              <img src={payment} width={25} height={25} alt="" />
              <Typography.Text
                tag="p"
                view="primary-medium"
                color="secondary"
                style={{ marginBottom: 0 }}
              >
                платёж
              </Typography.Text>
              <Typography.Text
                tag="p"
                view="primary-medium"
                style={{ marginBottom: 0 }}
              >
                {Math.floor(
                  (amount + countSum(amount, month.number)) / month.number,
                ).toLocaleString("ru-RU")}{" "}
                ₽
              </Typography.Text>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "73px",
                }}
              >
                <img src={cal} width={25} height={25} alt="" />
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  color="secondary"
                  style={{ marginBottom: 0 }}
                >
                  срок
                </Typography.Text>
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  style={{ marginBottom: 0 }}
                >
                  {month.number} мес.
                </Typography.Text>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                minWidth: "73px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={money} width={25} height={25} alt="" />
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  color="secondary"
                  style={{ marginBottom: 0 }}
                >
                  комиссия
                </Typography.Text>
                <Typography.Text
                  tag="p"
                  view="primary-medium"
                  style={{ marginBottom: 0 }}
                >
                  {Math.floor(month.paymentSum).toLocaleString("ru-RU")} ₽
                </Typography.Text>
              </div>
            </div>
          </div>
        </div>
        <Gap size={16} />
        <ButtonMobile
          loading={loading}
          onClick={submit}
          block
          view="primary"
          href=""
        >
          Перевести на Альфа-Карту
        </ButtonMobile>
      </div>
    </>
  );
};
