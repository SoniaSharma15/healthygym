import React from 'react'
import './DietPlan'
function DietPlanTable(props) {
  return (<>

  <div className=" bg-secondary w-100 px-2 py-3">
  <h3 className="text-center text-warning pb-2">Gym Diet Plan Chart - Day {props.day}</h3> 

  <table className="table table-sm ">
<tbody className="border">
<tr>
    <td>BreakFast</td>
    <td>{props.breakfast}</td>
    </tr>
  <tr>
    <td>Lunch	</td>
    <td>{props.lunch}</td>
    </tr>
  <tr>
    <td>Pre-Workout Snack	
    </td>
    <td>{props.preworkout}</td>
    </tr>
  <tr>
    <td>Dinner
    (Post-Workout)</td>
    <td>{props.dinner}</td>
    </tr> 
      </tbody>     
</table>
</div>

<hr />
    </> )
}

export default DietPlanTable