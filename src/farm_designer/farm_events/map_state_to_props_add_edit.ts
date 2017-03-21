import { AddEditFarmEventProps } from "../interfaces";
import { Everything } from "../../interfaces";
import * as moment from "moment";
import { DropDownItem } from "../../ui";
import { t } from "i18next";
import { saveFarmEvent, destroyFarmEvent } from "../actions";
import { selectAll } from "../../resources/util";
import { TaggedFarmEvent } from "../../resources/tagged_resources";

export function mapStateToPropsAddEdit(state: Everything): AddEditFarmEventProps {
  let handleTime = (e: React.SyntheticEvent<HTMLInputElement>, currentISO: string) => {
    // Am I really doing this right now? How else?
    let incomingTime = e.currentTarget.value.split(":");
    let hours = parseInt(incomingTime[0]) || 0;
    let minutes = parseInt(incomingTime[1]) || 0;

    switch (e.currentTarget.name) {
      case "start_time":
        // Put the current ISO established by the date field into a var
        let currentStartISO = new Date((currentISO || "").toString())
          .toISOString();

        // Set the time of the already existing iso string
        let newStartISO = moment(currentStartISO)
          .set("hours", hours)
          .set("minutes", minutes)
          .toISOString();

        return newStartISO;

      case "end_time":
        let currentEndISO = new Date((currentISO || "").toString())
          .toISOString();

        let newEndISO = moment(currentEndISO)
          .set("hours", hours)
          .set("minutes", minutes)
          .toISOString();

        return newEndISO;

      default:
        throw new Error("Expected a name attribute from time field.");
    }
  };

  let formatTime = (input: string) => {
    let iso = new Date(input).toISOString();
    return moment(iso).format("HH:mm");
  };

  let formatDate = (input: string) => {
    let iso = new Date(input).toISOString();
    return moment(iso).format("YYYY-MM-DD");
  };

  let repeatOptions = [
    // Removing this for now until prod. deploy is over.
    //   - R.C. Mar 2017
    // { label: "Do not repeat", value: "never", name: "time_unit" },
    { label: "minutes", value: "minutely", name: "time_unit" },
    { label: "hours", value: "hourly", name: "time_unit" },
    { label: "days", value: "daily", name: "time_unit" },
    { label: "weeks", value: "weekly", name: "time_unit" },
    { label: "months", value: "monthly", name: "time_unit" },
    { label: "years", value: "yearly", name: "time_unit" }
  ];

  let selectOptions: DropDownItem[] = [];

  selectOptions.push({ label: t("REGIMENS"), heading: true, value: "Regimens" });
  selectAll(state.resources.index, "regimens").map((regimen, index) => {
    // TODO: Remove executable_type from obj since it's
    // not declared in the interface.
    if (regimen.kind === "regimens" && regimen.body.id) {
      let item = {
        label: regimen.body.name,
        executable_type: "Regimen",
        executable_id: regimen.body.id,
        value: regimen.body.id
      };
      selectOptions.push(item);
    }
  });

  selectOptions.push({ label: t("SEQUENCES"), heading: true, value: "Sequences" });
  selectAll(state.resources.index, "sequences").map((sequence, index) => {
    // TODO: Remove executable_type from obj since it's
    // not declared in the interface.
    if (sequence.kind === "sequences" && sequence.body.id) {
      let item = {
        label: sequence.body.name,
        executable_type: "Sequence",
        executable_id: sequence.body.id,
        value: sequence.body.id
      };
      selectOptions.push(item);
    }
  });

  let farmEvents = selectAll(state.resources.index, "farm_events")
                   .filter(fe => fe.kind === "farm_events") as TaggedFarmEvent[];


  return {
    selectOptions,
    repeatOptions,
    formatDate,
    formatTime,
    handleTime,
    farmEvents,
    save(fe) {
      this.dispatch(saveFarmEvent(fe));
      this.router.push("/app/designer/farm_events");
    },
    delete(fe) {
      this.dispatch(destroyFarmEvent(fe));
      this.router.push("/app/designer/farm_events");
    },
  };
}
